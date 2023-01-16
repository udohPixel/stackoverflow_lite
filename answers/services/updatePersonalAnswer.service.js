// import required modules
const Answer = require('../models/Answer');
const ApplicationException = require('../../common/ApplicationException');
const Question = require('../../questions/models/Question');

// update answer service
const updateAnswerService = async (UserId, answerId, body, QuestionId) => {
  // fetch question
  const question = await Question.findOne({
    where: { id: QuestionId },
  });

  // check if question exists or not in dB
  if (!question) {
    throw new ApplicationException('Question does not exist', 404);
  }

  // fetch answer from dB
  const answer = await Answer.findOne(
    {
      where: {
        id: answerId,
      },
    },
  );

  // check if answer already exits in dB
  if (!answer) {
    throw new ApplicationException('Answer does not exist', 404);
  }

  // check if currently logged in user is creator of the answer
  if (UserId !== answer.UserId) {
    throw new ApplicationException('You are not allowed to update answer', 403);
  }

  answer.body = body;
  answer.QuestionId = Number(QuestionId);
  answer.UserId = UserId;

  const updatedAnswer = await answer.save();

  return updatedAnswer;
};

// export service
module.exports = updateAnswerService;
