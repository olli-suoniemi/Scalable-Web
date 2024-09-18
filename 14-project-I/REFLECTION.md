## General Overview

This is a project for a web application for practicing programming. The core functionality of the application is as follows:

- **User Interface:** Upon opening the application, the user is presented with the name and handout of a programming assignment. The interface includes a textarea for writing a Python program to solve the problem outlined in the handout and a submit button for assessment.
- **Assessment and Feedback:** After submission, the program is assessed, and the user receives updates on the grading status. If issues are found, they are displayed, allowing the user to adjust their code. If the program is correct, the user is notified of successful completion and can progress to the next assignment.
- **Progress Tracking:** When the user reopens the application, they can continue from the first incomplete assignment.

The focus of the project is on scalability, with an emphasis on topics such as performance measurement, multiple servers with load balancing, caching, static site generation, event-driven architecture, and message queues. Both development and production configurations are addressed.

<br>

## Architecture Overview

This application handles submissions and uses a message queue architecture with Redis for processing and caching. Below is an explanation of the key components and data flow based on the architecture diagram.

![Architecture Overview](static/Architecture.png)

#### Components and Data Flow

1. **Frontend:**
   - **POST Request:** Sends a new submission (sub) to the API. 
   - **GET Request:** Retrieves cached submissions from the API.
   - **Receive Graded Sub:** The frontend receives graded results once submissions are processed.
   - **DELETE Request:** Removes a submission by sending a DELETE request via the API.
   - **WebSocket Connection:** Opens a persistent connection to receive real-time updates on submission status.

2. **API:**
   - **Submission Handling:** Receives new or updated submissions from the frontend.
   - **Caching:** Submissions are cached to improve performance. Cache is flushed when submissions are added, updated, or deleted.
   - **Database Operations:** 
     - **Add/Update Subs:** Adds new submissions or updates existing ones in the database.
     - **Delete Subs:** Deletes submissions from the database, triggering cache flush.
   - **Queue Operations:** 
     - Publishes new/updated submissions to the Redis submission queue.
     - Publishes graded results to the Redis results queue after processing.

3. **Redis Sub Queue:**
   - Buffers new or updated submissions.
   - The **Grader** subscribes to this queue to process each submission.

4. **Grader:**
   - **Grade Submission:** Subscribes to the Redis submission queue, processes submissions (grades), and updates the submission status in the database.
   - **Cache Management:** Flushes the cache after grading to maintain data consistency.
   - **Result Publishing:** Publishes the grading result to the Redis results queue.

5. **Redis Results Queue:**
   - Stores graded results from the Grader.
   - The API and WebSocket systems subscribe to this queue to retrieve results and send them to the frontend.

6. **WebSocket:**
   - Subscribes to the Redis results queue to receive graded submissions.
   - Sends real-time updates to the frontend when grading is complete.

#### Caching Flow
- Caching is implemented to improve performance by storing submissions temporarily. 
- The cache is flushed whenever submissions are added, updated, or deleted to ensure the frontend receives the most up-to-date data.

#### Data Flow Summary
1. A new submission is sent from the frontend to the API.
2. The API stores the submission in the database and publishes it to the Redis submission queue, flushing the cache.
3. The Grader processes the submission, grades it, and updates the database.
4. The grading result is published to the Redis results queue.
5. The API and WebSocket subscribe to the results queue and send the graded submission back to the frontend.

#### Key Design Concepts
- **Message Queuing:** Redis is used for message queuing, allowing asynchronous processing of submissions and results.
- **Real-Time Updates:** WebSockets ensure the frontend receives real-time updates about submission status.
- **Caching:** Caching is employed to boost performance, with cache invalidation ensuring data consistency when the state of submissions changes.

<br>


## To improve

- In re-processing of old submissions, submission are reprocessed by all graders and not only one.

- Multiple pages doesn't work in production build. I tried to get NGINX to serve the static pages for production build but couldn't get it to work.

- The 'All submissions' page doesn't automatically show new submitted submissions. The user has to refresh the page to see new submissions. The grader feedback though is retrieved automatically without the need for refreshing.