// import required libraries
const express = require('express');
const logger = require('./logger/index');
const apiResponse = require('./common/ApiResponse');

// create express app and port
const app = express();
const PORT = process.env.PORT || '3000';

// use express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database = mysql
const { dbSetup } = require('./providers/db');

dbSetup();

const routes = require('./providers/routes/index');

app.use(routes);

app.use((err, _req, res, _next) => {
  if (err) {
    return apiResponse.errorObject(res, err);
  }
  return apiResponse.errorObject(res, err, 404);
});

// listener setup
app.listen(PORT, () => {
  logger.info(`Server is running at ${PORT}...`);
});

// export app
module.exports = app;
