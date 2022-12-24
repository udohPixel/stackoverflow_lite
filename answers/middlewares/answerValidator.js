// import required modules
const apiResponse = require('../../common/ApiResponse');

const {
  addAnswer,
} = require('../validations/answerValidationSchema');

// is add answer values validated
const isAddAnswerValidated = async (req, res, next) => {
  // validate answer-imputed values
  const answerValidator = await addAnswer.validate(req.body);

  // check if user-imputed values had errors
  if (answerValidator.error) {
    apiResponse.error(res, answerValidator.error?.message);
  } else {
    next();
  }
};

// export
module.exports = {
  isAddAnswerValidated,
};
