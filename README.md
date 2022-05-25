# node_api_rest

This is a Node.js project  with node_api_rest.

Getting Started
First, run the development server:

npm run dev
# or
npm start
Open http://localhost:3000 with your browser to see the welcome to the challenge.

You can start by accessing the path http://localhost:3000/api-docs. The documentation will be in that address.

Made with swagger, it will make it easier for you to carry out the tests.

When uploading it to heroku, the following changes are made:
- Uncomment //ssl:{rejectUnauthorized: false} in scr/controllers/db
- Comment process.env.URL_HOST = "http://localhost:3000" which is in /index.js