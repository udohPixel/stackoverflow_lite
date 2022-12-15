// import required modules
const logger = require('../logger');
const ApplicationException = require('./ApplicationException');

function send(res, code, success, message, data) {
  const responseData = {
    success,
    message,
    data,
  };
  return res.status(code).json(responseData);
}

// declare api response class
class ApiResponse {
  constructor() {
    this.send = send.bind(this);
  }

  // success response
  success(res, message, data, code) {
    return this.send(res, code || 200, true, message, data);
  }

  // error response
  error(res, message, data, code) {
    return this.send(res, code || 500, false, message, data);
  }

  // error response
  errorObject(res, error, code, meta) {
    let message;
    let theCode;

    if (error instanceof ApplicationException) {
      message = error.message;
      theCode = error.code;
    } else if (code === 404) {
      message = 'Not found';
    } else {
      logger.error(error.message, { ...error, meta });
      message = 'Unexpected error occurred while processing your request';
      theCode = 500;
    }

    return this.send(res, theCode, false, message);
  }
}

const apiResponse = new ApiResponse();

// export
module.exports = apiResponse;
