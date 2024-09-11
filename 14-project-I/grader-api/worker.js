import { createClient } from 'redis';
import { grade } from './services/gradingService.js';
import { updateSubmissionStatus } from './services/assignmentService.js';
import { randomUUID } from 'crypto'; 
import dotenv from 'dotenv';
dotenv.config();

const SERVER_ID = `grader-${randomUUID()}`; // Use Node's randomUUID

const redisClient = createClient({ url: 'redis://redis:6379', pingInterval: 1000 });

await redisClient.connect();

const redisSubscriber = redisClient.duplicate();
const redisPublisher = redisClient.duplicate();

await redisSubscriber.connect();
await redisPublisher.connect();

try {
  await redisSubscriber.xGroupCreate('submissions_stream', 'grader_group', '$', { MKSTREAM: true });
  console.log('Consumer group created or already exists');
} catch (err) {
  if (!err.message.includes('BUSYGROUP')) throw err;
}

async function processSubmissions() {
  while (true) {
    try {
      const result = await redisSubscriber.xReadGroup('grader_group', SERVER_ID, {
        key: 'submissions_stream',
        id: '>', 
        count: 1,
        block: 5000 
      });
      
      if (result && result.length > 0) {
        const [streamData] = result;
        const { messages } = streamData;

        for (const { id, message } of messages) {

          const { userID, programmingAssignmentID, code, testCode, submissionID } = message;

          console.log(`Processing submission for user ${userID}`);

          const gradingResult = await grade(code, testCode);
          const correct = gradingResult.includes('OK');

          const graderFeedback = gradingResult === '' 
            ? 'No feedback from grader. That means your code has an infinite loop' 
            : gradingResult;

          const lastUpdated = await updateSubmissionStatus({
            status: 'processed',
            graderFeedback,
            correct,
            id: submissionID
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

          await redisSubscriber.xAck('submissions_stream', 'grader_group', id);
        }
      }
    } catch (error) {
      console.error('Error processing submission from stream:', error.message || error);
      if (error.message.includes('NOGROUP')) {
        console.log('Recreating consumer group...');
        try {
          await redisSubscriber.xGroupCreate('submissions_stream', 'grader_group', '$', { MKSTREAM: true });
        } catch (groupError) {
          if (!groupError.message.includes('BUSYGROUP')) {
            console.error('Failed to recreate consumer group:', groupError);
          }
        }
      }
    }
  }
}

processSubmissions();

console.log(`${SERVER_ID} is running and waiting for submissions...`);
