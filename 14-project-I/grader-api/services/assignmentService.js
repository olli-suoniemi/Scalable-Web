import { postgres } from "../deps.js";

const sql = postgres({});

// Method to update the status of a submission
const updateSubmissionStatus = async (sumbissionData) => {
  const { status, graderFeedback, correct, id } = sumbissionData;

  try {
    const result = await sql`
      UPDATE programming_assignment_submissions 
      SET 
        status = ${status}, 
        grader_feedback = ${graderFeedback}, 
        correct = ${correct}, 
        last_updated = NOW()
      WHERE 
        id = ${id};
    `;

    console.log("Submission update result:", result.count > 0 ? 'Update successful' : 'Update failed');
  
  } catch (err) {
    console.error("Error updating submission status:", err);
    throw err;
  }
};

export {
  updateSubmissionStatus
};