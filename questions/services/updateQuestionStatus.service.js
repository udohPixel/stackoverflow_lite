// import required modules
const Question = require('../models/Question');
const ApplicationException = require('../../common/ApplicationException');

// update question status service
const updateQuestionStatusService = async (questionId) => {
  // fetch current question status
  const question = await Question.findByPk(questionId);

  // check if question exists
  if (!question) {
    throw new ApplicationException('Question does not exist', 404);
  }

  const theQuestionValues = {
    // toggle question active status
    isActive: question.isActive = !question.isActive,
  };

  // update question status
  await Question.update(
    theQuestionValues,
    {
      where: {
        id: questionId,
      },
    },
  );

  return question.isActive;
};

// export service
module.exports = updateQuestionStatusService;
