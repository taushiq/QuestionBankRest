//npm install mysql nodemon express body-parser jsonwebtoken cors


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const cors = require('./middlewares/cors');

const app = express(); // const server = http.createServer(callback);
const port = 3000;

// register bodyParser middleware with express
app.use(bodyParser.json());

// register a middleware, which enables CORS
app.use(cors());

// REST endpoint to check the login credentials
app.post('/login', require('./handlers/login'));

// middleware to check if the request contains JWT token in the form of a header, and 
// allow the user to access any routes, only if the JWT is present and not-tampered
app.use(require('./middlewares/auth'));

//to get all the question banks
app.get('/questionbanks', require('./handlers/get-all-question-banks'));
//adding question banks
app.post('/questionbanks/addquestionbank', require('./handlers/add-new-question-bank'));
app.post('/questionbanks/addquestion/:bname/:author', require('./handlers/add-new-question'));
app.delete('/questionbanks/deletequestion/:bname/:author/:question', require('./handlers/delete-question'));
app.delete('/questionbanks/deletequestionbank/:bname/:author/', require('./handlers/delete-question-bank'));
app.get('/questionbanks/:bname/:author', require('./handlers/get-question-bank-details'));
// HTTP POST request handler mapping

//adding a question to a question bank
//app.post('/questionbanks/addquestion', require('./handlers/add-new-question'))
app.listen(port, function () { console.log(`server started at port ${port}`); });
