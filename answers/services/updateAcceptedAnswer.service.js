// import required modules
const { Op } = require('sequelize');
const Answer = require('../models/Answer');
const ApplicationException = require('../../common/ApplicationException');
const Question = require('../../questions/models/Question');

// update accepted answer service
const updateAnswerStatusService = async (UserId, answerId) => {
  // fetch propective accepted answer
  const answer = await Answer.findByPk(answerId);

  // check if answer exists
  if (!answer) {
    throw new ApplicationException('Answer does not exist', 404);
  }

  // fetch question
  const question = await Question.findByPk(answer.QuestionId);

  // check if currently logged in user is creator of the question
  if (UserId !== question.UserId) {
    throw new ApplicationException('Unauthorized', 401);
  }

  const filter = {
    where: {
      [Op.and]: [
        {
          QuestionId: { [Op.eq]: answer.QuestionId },
        },
        { isAcceptedAnswer: { [Op.eq]: true } },
      ],
    },
  };

  // fetch former accepted answer (if any)
  const formerAcceptedAnswer = await Answer.findOne(filter);

  // check if former accepted answer exist
  if (formerAcceptedAnswer) {
    await Answer.update(
      { isAcceptedAnswer: false },
      filter,
    );
  }

  // update accepted answer
  await Answer.update(
    { isAcceptedAnswer: true },
    {
      where: {
        id: answerId,
      },
    },
  );

  // fetch accepted answer
  const acceptedAnswer = await Answer.findAll({
    where: {
      id: answerId,
    },
  });

  return acceptedAnswer[0].isAcceptedAnswer;
};

// export service
module.exports = updateAnswerStatusService;
