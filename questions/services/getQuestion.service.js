// import required modules
const Question = require('../models/Question');
const ApplicationException = require('../../common/ApplicationException');

// get question service
const getQuestionService = async (questionId) => {
  // fetch question by id from dB
  const question = await Question.findByPk(questionId);

  // check if question exists with provided id
  if (!question) {
    throw new ApplicationException('Question does not exist', 404);
  }

  return question;
};

// export service
module.exports = getQuestionService;
