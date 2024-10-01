The database is designed to support a system where users can ask questions and provide answers related to specific courses. Each course can have multiple questions, and each question can have multiple answers. Additionally, users can upvote questions and answers. The schema is made up of four main tables: courses, questions, answers, and upvotes.

The courses table stores information about each course offered on the platform. Each course has an ID, a name, and a description.

The questions table stores questions related to specific courses. Each question is tied to a course, and includes metadata such as the user who posted it, creation, and update timestamps.

The answers table stores answers to questions. Each answer is tied to a specific question and has similar metadata fields to the questions table. An index on question_id is created to optimize queries filtering answers by their associated question:

The upvotes table tracks user upvotes for both questions and answers. It uses a composite key to handle different entity types (questions or answers). A composite index on entity_type and entity_id allows for efficient lookups of upvotes based on the type and the specific entity being upvoted: