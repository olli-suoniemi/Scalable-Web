import { createClient } from "npm:redis@4.6.4";
import { grade } from "./services/gradingService.js";
import { updateSubmissionStatus } from "./services/assignmentService.js";

const SERVER_ID = `grader-${crypto.randomUUID()}`;  // Unique ID for each grader instance

const redisClient = createClient({ url: "redis://redis:6379", pingInterval: 1000 });

await redisClient.connect();

const redisSubscriber = redisClient.duplicate();
const redisPublisher = redisClient.duplicate();

await redisSubscriber.connect();
await redisPublisher.connect();


// Create the consumer group if it doesn't exist
try {
  await redisSubscriber.xGroupCreate('submissions_stream', 'grader_group', '$', { MKSTREAM: true });
  console.log("Consumer group created or already exists");
} catch (err) {
  if (!err.message.includes("BUSYGROUP")) throw err;
}

async function processSubmissions() {
  while (true) {
    try {
      const result = await redisSubscriber.xReadGroup('grader_group', SERVER_ID, {
        key: 'submissions_stream',
        id: '>',       // Read only new submissions
        count: 1,      // Process one submission at a time
        block: 5000    // Block for 5 seconds if no messages
      });
      
      if (result && result.length > 0) {

        const [streamData] = result;
        const { messages } = streamData;

        for (const { id, message } of messages) {

          console.log(`main thread heapdump: ${writeHeapSnapshot()}`);
          const { userID, programmingAssignmentID, code, testCode, submissionID: submissionID } = message;  // Destructure
          
          console.log(`Processing submission for user ${userID}`);

          // Grade the submission
          const gradingResult = await grade(code, testCode);
          const correct = gradingResult.includes("OK");

          const graderFeedback = gradingResult === "" 
            ? "No feedback from grader. That means your code has an infinite loop" 
            : gradingResult;

          // Update submission status based on grading
          const lastUpdated = await updateSubmissionStatus({
            status: 'processed',
            graderFeedback: graderFeedback,
            correct: correct,
            id: submissionID,
          });

          const resultChannel = `grading_result_${userID}`;
          const publishResult = await redisPublisher.publish(resultChannel, JSON.stringify({
            id: submissionID,
            programmingAssignmentID,
            graderFeedback,
            correct,
            status: 'processed',
            lastUpdated,
            code,
            userID
          }));

          console.log(`Published grading result to ${resultChannel}, Number of clients received: ${publishResult}`);

          // Acknowledge the message (remove it from the stream)
          await redisSubscriber.xAck('submissions_stream', 'grader_group', id);
        }
      }
    } catch (error) {
      console.error("Error processing submission from stream:", error.message || error);
      // Handle NOGROUP error by recreating the group
      if (error.message.includes('NOGROUP')) {
        console.log("Recreating consumer group...");
        try {
          await redisSubscriber.xGroupCreate('submissions_stream', 'grader_group', '$', { MKSTREAM: true });
        } catch (groupError) {
          if (!groupError.message.includes('BUSYGROUP')) {
            console.error("Failed to recreate consumer group:", groupError);
          }
        }
      }
    }
  }
}

processSubmissions();


console.log(`${SERVER_ID} is running and waiting for submissions...`);