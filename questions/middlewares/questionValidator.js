// import required modules
const apiResponse = require('../../common/ApiResponse');

const {
  addQuestion,
} = require('../validations/questionValidationSchema');

// is add question values validated
const isAddQuestionValidated = async (req, res, next) => {
  // validate question-imputed values
  const questionValidator = await addQuestion.validate(req.body);

  // check if user-imputed values had errors
  if (questionValidator.error) {
    apiResponse.error(res, questionValidator.error?.message);
  } else {
    next();
  }
};

// export
module.exports = {
  isAddQuestionValidated,
};
