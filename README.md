# Full Stack Challenge @ Devertix

## Overview

- Frontend URL: https://dslkk3miov5rp.cloudfront.net (on Amazon AWS S3 with CloudFront)
- Backend URL:
  https://ssoo24vldyrivr6skhwr5w4zb40qoakj.lambda-url.eu-central-1.on.aws (on Amazon AWS Lambda)

- Frontend built with TypeScript using Vite with React and Ant Design + Emotion
- Backend built with TypeScript using Node.js with Express + Zod

## How to run locally

- Clone the repository
- Run `npm install` in both the backend and the frontend folder
- Duplicate the .env.template file and rename it to .env in both the backend and the frontend folder
- Run `npm run dev` in both the backend and the frontend folder
- Access the frontend at http://localhost:5173
- Access the backend at http://localhost:3000

## Notes

- This is the first time I used AWS Lambda therefore the deployment took a while so I had to sacrifice some coding because of it.
- Database is not used, the endpoint is just returning simply from a JSON file instead, this is also because of the same reason.
- As part of how I planned to build on the /questions endpoint while planning the communication with the database, I introduced a "number" query parameter which (in its current form) is just a simple configuration feature.

## Improvement ideas

- React Router is not used because I don't think it makes sense in a quiz app to have the individual questions linkable. Instead, I came up with the idea to store most of the AppState's content in local storage so the user can get back anytime and continue from where he left off.
- I think Redux is not a must-have in the current state of the app. The AppState context was structured in a way that if Redux would become necessary (for example because of its time-traveling feature to debug easier), it could be pulled in quickly. I would use [Redux Toolkit](https://redux-toolkit.js.org/) for this.
- I wanted to create some [snapshot tests](https://vitest.dev/guide/snapshot.html) at least for the frontend but I haven't used it with Vite yet and some complications came up. For the backend, I would create some integration tests with [Supertest](https://github.com/ladjs/supertest).
