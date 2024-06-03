import * as assignmentService from "./services/assignmentService.js";
import { cacheMethodCalls } from "./util/cacheUtil.js";

// cache everything, and flush the cache when the addSubmission method is called
const cachedAssignmentService = cacheMethodCalls(assignmentService, ["addSubmission"]);

const handleGetNextAssignment = async (request) => {
  const requestData = await request.json();
  const userID = requestData["user"]

  // Get assignment based on userID
  const response = Response.json(await cachedAssignmentService.getNextAssignment(userID));
  
  return response;
};

const handleGetSubmissions = async (request) => {
  const requestData = await request.json();
  const userID = requestData["user"]
  
  // Get submissions based on userID
  const response = Response.json(await cachedAssignmentService.getSubmissionsByUser(userID));
  
  return response;
};

const handlePostAssignment = async (request) => {
  const requestData = await request.json();
  const userID = requestData["user"]
  const submittedCode = requestData["code"]
  const testCode = requestData["testCode"]
  const programmingAssignmentID = requestData["id"]
  let submissionIsCorrect = false
  
  const data = {
    testCode: testCode,
    code: submittedCode,
  };

  // Send submission to grader
  const response = await fetch("http://grader-api:7000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Send submission and the feedback to the database
  const result = await response.json();

  // Check if the submission was OK or FAILED
  if (result["result"].includes("OK")) {
    submissionIsCorrect = true
  } else {
    submissionIsCorrect = false
  } 

  const submissionData = {
    programmingAssignmentID: programmingAssignmentID,
    code: submittedCode,
    userID: userID,
    gradingStatus: 'processed',
    graderFeedback: result["result"] === "" ? "No feedback from grader. That means your code has an infinite loop" : result["result"],
    correct: submissionIsCorrect,
    lastUpdated: new Date()
  }
  await cachedAssignmentService.addSubmission(submissionData);

  return Response.json(submissionIsCorrect);

};

const handleGetPoints = async (request) => {
  const requestData = await request.json();
  const userID = requestData["user"]

  // Get correct submissions based on userID
  const response = Response.json(await cachedAssignmentService.getCorrectSubmissions(userID));

  return response;
}

const urlMapping = [
    {
      method: "POST",
      pattern: new URLPattern({ pathname: "/submissions" }),
      fn: handleGetSubmissions,
    },
    {
      method: "POST",
      pattern: new URLPattern({ pathname: "/assignment" }),
      fn: handleGetNextAssignment,
    },
    {
      method: "POST",
      pattern: new URLPattern({ pathname: "/grade" }),
      fn: handlePostAssignment,
    },
    {
      method: "POST",
      pattern: new URLPattern({ pathname: "/points" }),
      fn: handleGetPoints,
    },
];

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
    return new Response(e.stack, { status: 500 })
  }
};

const portConfig = { port: 7777, hostname: '0.0.0.0' };
Deno.serve(portConfig, handleRequest);