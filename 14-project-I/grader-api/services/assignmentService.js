import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL, // Use environment variable for PostgreSQL connection
});

await client.connect();

const updateSubmissionStatus = async (submissionData) => {
  const { status, graderFeedback, correct, id } = submissionData;

  try {
    const res = await client.query(
      `UPDATE programming_assignment_submissions 
      SET status = $1, grader_feedback = $2, correct = $3, last_updated = NOW() 
      WHERE id = $4 RETURNING last_updated`,
      [status, graderFeedback, correct, id]
    );

    console.log('Submission update result:', res.rowCount > 0 ? 'Update successful' : 'Update failed');
    return res.rowCount > 0 ? res.rows[0].last_updated : false;
  } catch (err) {
    console.error('Error updating submission status:', err);
    throw err;
  }
};

export { updateSubmissionStatus };
