To build the application locally, make sure you have `node`, `mongodb` installed in your local env:

Go to `frontend`, run:
* `npm install`
* `npm run build`

Go to `backend`, run:
* `npm install`
* `mongod` to start the MongoDB server if necessary
* `npm start`
Open a browser tab, go to localhost:3000 to access the webpage.

Start a new terminal tab, run:
* `mongo`

You should be able to enter the mongo shell. Then input the following commands to verify the form you just submitted:
* `use my-quiz-app`
* `db.surveys.find().pretty()` and it will output the content of the database
