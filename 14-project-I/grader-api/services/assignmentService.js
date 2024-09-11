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

const getPendingSubmissionsOlderThan = async (minutes) => {
  const fiveMinutesAgo = new Date(Date.now() - minutes * 60000).toISOString();

  try {
    const result = await client.query(
      `SELECT * FROM programming_assignment_submissions WHERE status = 'pending' AND last_updated < $1`, 
      [fiveMinutesAgo]
    );

    console.log('Found pending submissions:', result.rowCount);
    return result.rows
  } catch (err) {
    console.error('Error getting pending submissions:', err);
    throw err;
  }
};

const getTestCodeForAssignment = async (id) => {

  try {
    const result = await client.query(
      `SELECT test_code FROM programming_assignments WHERE id = $1`, 
      [id]
    );

    return result.rows
  } catch (err) {
    console.error('Error getting test code:', err);
    throw err;
  }
};

export { updateSubmissionStatus, getPendingSubmissionsOlderThan, getTestCodeForAssignment };
