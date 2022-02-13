/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

// INITIALIZE APP
const app = express();

// ADDING CORS MIDDLEWARE
const allowlist = [
  'http://localhost:3000',
];

function corsOptionsDelegate(req, callback) {
  //Console.log(vercelRegeURL.test(req.header('Origin')));
  console.log(allowlist.indexOf(req.header('Origin')));
  let corsOptions = {
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  };
  if (
    allowlist.indexOf(req.header('Origin')) !== -1
  ) {
    corsOptions = { ...corsOptions, origin: req.header('Origin') };
  }
  callback(null, corsOptions);
}
app.use(cors(corsOptionsDelegate));
app.use(cookieParser());
app.use(morgan('tiny'));

//  INITIALIZE BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());

//IMPORT ROUTES
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

app.use('/',authRouter);
app.use('/users', userRouter);

// UNHANDLE ROUTE RESPONSE
app.all('*', (req, res) => {
  res.status(404).send({
    statusCode: 404,
    message: `OOPs!! Server can't find ${req.originalUrl}.
    This could be a typographical issue. 
    Check the API specification for further guidiance`,
  });
});

// UNHANDLED ERRORS
app.use((error, req, res, next) => {
  console.log(error);
  return res.status(500).json('Server error, try again');
});

module.exports = app;
