import { createClient } from "npm:redis@4.6.4";
import { grade } from "./services/gradingService.js";
import { updateSubmissionStatus } from "./services/assignmentService.js";

// Set up Redis clients
const redisSubscriber = createClient({
  url: "redis://redis:6379",
  pingInterval: 1000,
});

const redisPublisher = createClient({
  url: "redis://redis:6379",
  pingInterval: 1000,
});

await redisSubscriber.connect();
await redisPublisher.connect();

// Subscribe to the 'submissions' channel
redisSubscriber.subscribe('submissions', async (message) => {
  try {
    const submissionData = JSON.parse(message);

    console.log("Processing submission:", submissionData);

    // Extract the code and test code from the submission data
    const { code, testCode, userID, programmingAssignmentID, id } = submissionData;

    // Process the grading
    const result = JSON.stringify(await grade(code, testCode));
    console.log(`Submission with ID ${id} graded`);

    const correct = result.includes("OK");

    const parsedResult = JSON.parse(result)
    
    const graderFeedback = parsedResult === "" ? "No feedback from grader. That means your code has an infinite loop" : parsedResult;

    // Update the submission in the database
    await updateSubmissionStatus({
      status: 'processed',
      graderFeedback: graderFeedback,
      correct: correct,
      id: id,
    })

    // Flush the Redis cache
    await redisPublisher.flushDb();
    console.log("Redis cache flushed.");
    
    // Publish the result to Redis using the separate publisher client
    try {
      const resultChannel = `grading_result_${userID}`;
      const publishResult = await redisPublisher.publish(resultChannel, JSON.stringify({
        id: id,
        programmingAssignmentID,
        graderFeedback,
        correct,
        status: 'processed'
      }));
    
      console.log(`Published grading result to ${resultChannel}, Number of clients received: ${publishResult}`);
    } catch (publishError) {
      console.error("Error publishing to Redis:", publishError.message || publishError);
    }
  } catch (error) {
    console.error("Error processing submission:", error.message || error);
  }
});

console.log("Grader API is running and waiting for submissions...");