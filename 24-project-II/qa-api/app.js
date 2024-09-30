import * as questionService from "./services/questionsService.js";
import { createClient } from "npm:redis@4.6.4";

// Redis Publisher Client
const publisherClient = createClient({
  url: "redis://redis:6379",  // Replace with your Redis instance connection string if needed
  pingInterval: 1000,
});

// Connect to Redis
publisherClient.connect().catch(console.error);


// Handle fetching available courses (main page)
const handleGetCourses = async (request) => {
  const courses = await questionService.getAllCourses();
  return new Response(JSON.stringify(courses), { status: 200 });
};

// Handle fetching sinle course (course page)
const handleGetCourse = async (request, { pathname }) => {
  const courseID = pathname.groups.id;
  const course = await questionService.getCourseById(courseID);
  return new Response(JSON.stringify(course), { status: 200 });
};

// Handle creating a new question on a course
const handlePostQuestion = async (request) => {
  const requestData = await request.json();
  const courseID = requestData["courseID"];
  const questionText = requestData["question"];
  const userID = requestData["user"];

  // // Rate limit: only allow one question per user per minute
  // const lastQuestionTime = await questionService.getLastQuestionTime(userID);
  // if (lastQuestionTime && Date.now() - lastQuestionTime < 60000) {
  //   return new Response(
  //     JSON.stringify({ error: "Please wait a minute before posting again." }),
  //     { status: 429 }
  //   );
  // }

  // Add the new question to the database
  const newQuestion = {
    courseID,
    questionText,
    userID,
    createdAt: new Date(),
    lastUpdated: new Date(),
  };

  const result = await questionService.addQuestion(newQuestion);

  if (result && result.id) {
    const resultCopy = JSON.parse(JSON.stringify(result)); // Deep clone
    const resultID = resultCopy.id; // Use resultCopy

    // Immediately respond to the user that the question was created successfully
    const userResponse = new Response(JSON.stringify(result), { status: 201 });
    
    // Asynchronously handle LLM answer generation and publishing to Redis
    (async () => {
      try {
        // Array to hold the generated answers
        const generatedAnswers = [];

        // Call the LLM API three times to get three answers
        for (let i = 0; i < 3; i++) {
          const llmResponse = await fetch("http://llm-api:7000/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: questionText }),
          });

          if (llmResponse.ok) {
            const answer = await llmResponse.json(); 
            
            let generatedText = answer[0].generated_text;
            
            try {
              // Add the new LLM answer to the database
              const newAnswer = {
                questionID: resultID,
                answerText: generatedText,
                userID: 'LLM',
                createdAt: new Date(),
                lastUpdated: new Date(),
                isLLMGenerated: true
              };

              await questionService.addAnswer(newAnswer);
            } catch (error) {
              console.error(error)
            }
            
            // Push the cleaned answer into the array
            generatedAnswers.push(generatedText); 
            
          } else {
            console.error(`Failed to generate LLM answer for question ${result.id}`);
          }
        }

        // Publish each generated answer to a Redis channel for further processing
        for (const answer of generatedAnswers) {
          await publisherClient.publish("llm-answers", JSON.stringify({
            questionID: result.id,
            answer: answer.answer, // Send each generated answer
          }));
        }

        console.log(`LLM answers for question ${result.id} published to Redis channel`);
      } catch (error) {
        console.error(`Error while calling LLM API or publishing to Redis: ${error}`);
      }
    })();

    // Return the response to the user without waiting for the LLM generation
    return userResponse;
  } else {
    return new Response("Failed to create question.", { status: 500 });
  }
};


// Handle fetching questions for a specific course (with sorting & pagination)
const handleGetQuestions = async (request) => {
  const url = new URL(request.url);
  const courseID = url.searchParams.get("courseID");
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = parseInt(url.searchParams.get("limit")) || 20;

  const questions = await questionService.getQuestions(courseID, page, limit);
  return new Response(JSON.stringify(questions), { status: 200 });
};


// Handle fetching a single question with its answers (question page)
const handleGetQuestionDetails = async (request, { pathname }) => {
  const questionID = pathname.groups.id;
  
  // Extract pagination parameters from query params
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = parseInt(url.searchParams.get("limit")) || 10; // Set a default limit

  const question = await questionService.getQuestionById(questionID);
  const answers = await questionService.getAnswersByQuestionId(questionID, page, limit); // Pass pagination parameters

  if (question) {
    return new Response(JSON.stringify({ question, answers }), { status: 200 });
  } else {
    return new Response("Question not found", { status: 404 });
  }
};


// Handle posting a new answer to a question
const handlePostAnswer = async (request) => {
  const requestData = await request.json();
  const questionID = requestData["questionID"];
  const answerText = requestData["answer"];
  const userID = requestData["user"];

  // Rate limit: only allow one answer per user per minute
  // const lastAnswerTime = await questionService.getLastAnswerTime(userID);
  // if (lastAnswerTime && Date.now() - lastAnswerTime < 60000) {
  //   return new Response(
  //     JSON.stringify({ error: "Please wait a minute before posting again." }),
  //     { status: 429 }
  //   );
  // }

  // Add the new answer to the database
  const newAnswer = {
    questionID,
    answerText,
    userID,
    createdAt: new Date(),
    lastUpdated: new Date(),
    isLLMGenerated: false
  };

  const result = await questionService.addAnswer(newAnswer);
  return result
    ? new Response(JSON.stringify(result), { status: 201 })
    : new Response("Failed to create answer.", { status: 500 });
};

// Handle upvoting a question
const handleUpvoteQuestion = async (request, { pathname }) => {
  const questionID = pathname.groups.id;
  const { user } = await request.json(); // Extract user token

  // Check if the user has already upvoted the question
  const hasUpvoted = await questionService.hasUserUpvotedQuestion(user, questionID);
  if (hasUpvoted) {
    return new Response(JSON.stringify({ error: "You have already upvoted this question." }), { status: 403 });
  }

  // Increment the upvote count
  const upvoteResult = await questionService.upvoteQuestion(user, questionID);

  return new Response(JSON.stringify(upvoteResult), { status: 200 });
};

// Handle upvoting an answer
const handleUpvoteAnswer = async (request, { pathname }) => {
  const answerID = pathname.groups.id;
  const { user } = await request.json(); // Extract user token

  // Check if the user has already upvoted the answer
  const hasUpvoted = await questionService.hasUserUpvotedAnswer(user, answerID);
  if (hasUpvoted) {
    return new Response(JSON.stringify({ error: "You have already upvoted this answer." }), { status: 403 });
  }

  // Increment the upvote count
  const upvoteResult = await questionService.upvoteAnswer(user, answerID);

  return new Response(JSON.stringify(upvoteResult), { status: 200 });
};

// URL mappings
const urlMapping = [
  { method: "GET", pattern: new URLPattern({ pathname: "/courses" }), fn: handleGetCourses },
  { method: "GET", pattern: new URLPattern({ pathname: "/courses/:id" }), fn: handleGetCourse },
  { method: "POST", pattern: new URLPattern({ pathname: "/question" }), fn: handlePostQuestion },
  { method: "GET", pattern: new URLPattern({ pathname: "/questions" }), fn: handleGetQuestions },
  { method: "GET", pattern: new URLPattern({ pathname: "/question/:id" }), fn: handleGetQuestionDetails },
  { method: "POST", pattern: new URLPattern({ pathname: "/answer" }), fn: handlePostAnswer },
  { method: "POST", pattern: new URLPattern({ pathname: "/question/upvote/:id" }), fn: handleUpvoteQuestion },
  { method: "POST", pattern: new URLPattern({ pathname: "/answer/upvote/:id" }), fn: handleUpvoteAnswer },
];

// Main request handler
const handleRequest = async (request) => {
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  try {
    return await mapping.fn(request, mappingResult);
  } catch (e) {
    console.log(e);
    return new Response(e.stack, { status: 500 });
  }
};

// Start the server
const portConfig = { port: 7777, hostname: "0.0.0.0" };
Deno.serve(portConfig, handleRequest);
