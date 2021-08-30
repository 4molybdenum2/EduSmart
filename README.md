# EduSmart

Kind of a Google Classroom clone....

# Idea
This web application features a online classroom in which teachers can take online classes including posting
assignments and taking MCQ tests for separate courses. The website also features a fully custom calendar to track user statuses.

# Features
- Authentication using JWT tokens and Google OAuth 2.0
- REST API's to fetch data from a Express.js + Node.js backend server
- Separate login features for teachers and student. You can either sign up as teacher or a student.
- CRUD operations can also be performed on all of the courses, tests and assignments depending on the user's access levels.
- Necessary aggregation pipelines to manipulate data on the backend.
- Student can join / leave courses for specific subjects.

# Tech-Stack:

- **TypeScript** on the backend,  **Javascript** on the frontend.
- **ReactJS** on the frontend and **ExpressJS + NodeJS** on the backend.
- **MongoDB** as a database with aggregation pipelines to model data.


# Installation:

- ` git clone https://github.com/4molybdenum2/EduSmart `
- Run `yarn` in both the home directory and the frontend directory in the repo to install dependencies.
- Add a `.env` file with the following paramaters
    `MONGODB_URI= # Mongo uri for Mongo Atlas
    JWT_SECRET= # your JWT secret
    CLIENT_ID= # your google oauth client id`
- `yarn start` in home directory and frontend directory to start both frontend and backend
- Server will be hosted on localhost:8000 and frontend on localhost:3000 in DEV mode.

# Challenges Faced:
