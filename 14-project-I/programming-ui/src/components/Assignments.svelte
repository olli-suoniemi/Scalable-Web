<script>
  import { userUuid, userPoints } from "../stores/stores.js";
  import { onMount } from 'svelte';

  let submission = "";
  let submissions = [];
  let showSubmissions = false;
  let isLoading = false;

  const getUserPoints = async () => {
    const response = await fetch("/api/points", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: $userUuid }),
    });
    const pointsData = await response.json();
    userPoints.set(pointsData[0].correct_assignments_count * 100);
  };

  onMount(() => {
    getUserPoints();
  });

  const getAssignment = async () => {
    const response = await fetch("/api/assignment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user: $userUuid}),
    });
    return await response.json();
  };

  let assignmentPromise = getAssignment();

  const getSubmissions = async () => {
    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: $userUuid }),
    });
    return await response.json();
  };

  const addSubmission = async () => {
    if (submission.length == 0) {
        return;
    }

    isLoading = true; // Set loading state to true

    // Await the assignmentPromise to get the resolved value
    const assignment = await assignmentPromise;

    const newSubmission = { 
      user: $userUuid,
      code: submission,
      testCode: assignment[0].test_code,
      id: assignment[0].id
    };

    // send the submission to the grader
    const response = await fetch("/api/grade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSubmission),
    });

    const result = await response.json();

    submission = "";

    isLoading = false; // Set loading state to false

    // Update user points if the submission is correct

    if (result) {
      userPoints.update(points => points + 100);
      // get new assignment for the user
      assignmentPromise = getAssignment();
      // update user points
      getUserPoints();
    }

    // get all submissions to show the just submitted assignment
    submissions = await getSubmissions();

    // show the submissions
    showSubmissions = true;

  };

  const toggleShowSubmissions = async () => {
    showSubmissions = !showSubmissions;
    if (showSubmissions) {
      submissions = await getSubmissions();
      console.log(submissions);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0'); // Ensure two digits
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure two digits
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Ensure two digits
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    const year = date.getFullYear();

    const formattedDate = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
    return formattedDate;
  };

  const formatGraderFeedback = (feedback) => {
    // Split feedback into lines
    const lines = feedback.split('\n');
    // Format each line with a bullet point
    const formattedFeedback = lines.map(line => `${line}`).join('\n');
    return formattedFeedback;
  };
</script>

<style>
  /* Add some styling for the loading spinner */
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #000;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .disabled-grading-button {
    background-color: #cbd5e0;
    cursor: not-allowed;
  }
</style>

<div class="container mx-auto px-4 py-8">
  <div class="bg-blue-500 text-white py-2 px-4 rounded mb-4">
    <h1 class="font-bold text-2xl">Exercise points</h1>
    <p>Points: {$userPoints}</p>
  </div>

  <h1 class="font-extrabold text-3xl mb-4">Assignment</h1>

  {#await assignmentPromise}
    <p>Loading...</p>
  {:then assignments}
    {#if assignments === null}
      <p>All assignments done</p>
    {:else}
      <div class="space-y-4">
        {#each assignments as assignment}
          <div class="border border-gray-200 p-4 rounded-md shadow">
            <p class="text-lg font-semibold">{assignment.title}</p>
            <p>{assignment.handout}</p>
          </div>
        {/each}
      </div>
    {/if}
  {:catch error}
    <p class="text-red-500">Error: {error.message}</p>
  {/await}

  <div class="mt-8">
    <textarea 
      type="text" 
      bind:value={submission} 
      class="w-full h-32 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 resize-y"
      placeholder="Write your submission here" 
    />
  </div>

  <div class="mt-4">
    <button
      class={`font-bold py-2 px-4 rounded ${isLoading ? 'disabled-grading-button' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
      on:click={addSubmission}
      disabled={isLoading}
    >
      Send Submission
    </button>

    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
      on:click={toggleShowSubmissions}
    >
      Show Submissions
    </button>
  </div>

  {#if isLoading}
    <div class="mt-4 flex justify-center">
      <div class="spinner"></div> <!-- Loading spinner -->
      <p class="ml-2">Grading submission...</p>
    </div>
  {/if}

  {#if showSubmissions}
  <div class="mt-8">
    <h2 class="font-extrabold text-2xl mb-4">Previous Submissions</h2>
    <div class="space-y-4">
      {#each submissions as submission}
      <div class="border border-gray-200 p-4 rounded-md shadow {submission.correct ? 'bg-green-100' : 'bg-red-100'}">
        <p class="text-sm font-medium">Programming Task ID: {submission.programming_assignment_id}</p>
        <p class="text-sm font-medium">Submission Code:</p>
        <pre class="bg-gray-100 p-2 rounded">{submission.code}</pre>
        <p class="text-sm font-medium">Status: {submission.status}</p>
        {#if submission.grader_feedback}
        <p class="text-sm font-medium">Grader Feedback:</p>
        <pre class="bg-gray-100 p-2 rounded">{formatGraderFeedback(submission.grader_feedback)}</pre>
        {/if}
        <p class="text-sm font-medium">Correct: {submission.correct ? 'Yes' : 'No'}</p>
        <p class="text-sm font-medium">Submitted: {formatDate(submission.last_updated)}</p>
      </div>
      {/each}
    </div>
  </div>
{/if}

  
  
</div>


