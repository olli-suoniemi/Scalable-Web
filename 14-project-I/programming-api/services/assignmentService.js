import { postgres } from "../deps.js";

const sql = postgres({});

const getSubmissions = async () => {
  const result = await sql`SELECT * FROM programming_assignment_submissions;`;
  return result
}

const getSubmissionsByUser = async (id) => {
  const result = await sql`
    SELECT * FROM programming_assignment_submissions WHERE user_uuid = ${id}
    ORDER BY programming_assignment_id DESC, last_updated DESC;
  `;
  return result
};

const getNextAssignment = async (user_uuid) => {
  const result = await getSubmissionsByUser(user_uuid)

  // if there are submission by the user
  if (result && result.length > 0) {
    // Initialize variables to track the highest ID and completion status
    let maxAssignmentId = 0;
    let completedAssignmentId = null;
    let nextAssignmentID = 1;

    // Iterate through the submissions
    result.forEach(submission => {
      // Check if the submission is correct
      if (submission.correct === true) {
        // Update the maximum assignment ID if the current submission's ID is higher
        if (submission.programming_assignment_id > maxAssignmentId) {
          maxAssignmentId = submission.programming_assignment_id;
          completedAssignmentId = submission.programming_assignment_id;
        }
      }
    });

    // If there is a completed assignment, return its ID
    if (completedAssignmentId !== null) {
      nextAssignmentID = completedAssignmentId + 1;
    } else {
      nextAssignmentID = 1;
    }

    console.log('Next assignment ID:', nextAssignmentID)

    const nextAssignment = await getAssignmentByAssignmentOrder(nextAssignmentID)
  
    if (nextAssignment && nextAssignment.length > 0 ) {
      console.log("returning existing or next assignment (some old submissions already)")
      return nextAssignment
    }
    else {
      console.log("returning null (all assignments done)")
      return null;
    }
  } else {
    // if there are not submissions, return the first assignment
    console.log("returning first assignment (no submissions yet)")
    const result = await sql`SELECT * FROM programming_assignments WHERE assignment_order = 1`
    return result
  }
};

const getAssignments = async () => {
  const result = await sql`SELECT * FROM programming_assignments;`;
  return result
};

const getAssignmentByAssignmentOrder = async (assignmentOrder) => {
  const result = await sql`SELECT * FROM programming_assignments WHERE assignment_order = ${assignmentOrder};`;
  return result
};

const addSubmission = async (submission) => {
  const {
    programmingAssignmentID,
    code,
    userID,
    gradingStatus,
    graderFeedback,
    correct,
    lastUpdated
  } = submission;

  try {
    await sql`
      INSERT INTO programming_assignment_submissions (
        programming_assignment_id, code, user_uuid, status, grader_feedback, correct, last_updated
      ) VALUES (${programmingAssignmentID}, ${code}, ${userID}, ${gradingStatus}, ${graderFeedback}, ${correct}, ${lastUpdated})
    `;
  } catch (err) {
    console.error('Error adding new submission:', err);
    throw err;
  }
}

const getCorrectSubmissions = async (id) => {
  const result = await sql`
  SELECT 
    COUNT(DISTINCT programming_assignment_id) AS correct_assignments_count
  FROM 
    programming_assignment_submissions 
  WHERE 
    user_uuid = ${id} AND 
    correct = TRUE;
  `;
  return result
};

export { getNextAssignment, getAssignments, addSubmission, getSubmissionsByUser, getCorrectSubmissions };