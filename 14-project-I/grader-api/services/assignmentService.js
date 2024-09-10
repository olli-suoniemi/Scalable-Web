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
        id = ${id}
      RETURNING last_updated;
    `;

    console.log("Submission update result:", result.count > 0 ? 'Update successful' : 'Update failed');

    return result.count > 0 ? result[0].last_updated : false
      
  } catch (err) {
    console.error("Error updating submission status:", err);
    throw err;
  }
};

export {
  updateSubmissionStatus
};