// import required modules
const Question = require('../models/Question');
const ApplicationException = require('../../common/ApplicationException');

// update question service
const updateQuestionService = async (UserId, questionId, title, body, CategoryId) => {
  // fetch question from dB
  const question = await Question.findOne(
    {
      where: {
        id: questionId,
      },
    },
  );

  // check if question already exits in dB
  if (!question) {
    throw new ApplicationException('Question does not exist', 404);
  }

  // check if currently logged in user is creator of the question
  if (UserId !== question.UserId) {
    throw new ApplicationException('Unauthorized', 401);
  }

  // update question
  await Question.update(
    {
      title, body, CategoryId, UserId,
    },
    {
      where: {
        id: questionId,
      },
    },
  );

  // get updated question
  const updatedQuestion = await Question.findByPk(questionId);

  return updatedQuestion;
};

// export service
module.exports = updateQuestionService;
