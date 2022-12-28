// import required modules
const Answer = require('../models/Answer');
const ApplicationException = require('../../common/ApplicationException');

// update answer service
const updateAnswerService = async (UserId, answerId, body, QuestionId) => {
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
    throw new ApplicationException('Unauthorized', 401);
  }

  // update answer
  await Answer.update(
    {
      body, QuestionId, UserId,
    },
    {
      where: {
        id: answerId,
      },
    },
  );

  // get updated answer
  const updatedAnswer = await Answer.findByPk(answerId);

  return updatedAnswer;
};

// export service
module.exports = updateAnswerService;
