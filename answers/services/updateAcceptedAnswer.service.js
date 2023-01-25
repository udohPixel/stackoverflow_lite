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
    throw new ApplicationException('You are not allowed to update accepted answer', 403);
  }

  // fetch former accepted answer (if any)
  const formerAcceptedAnswer = await Answer.findOne({
    where: {
      [Op.and]: [
        {
          QuestionId: { [Op.eq]: answer.QuestionId },
        },
        { isAcceptedAnswer: { [Op.eq]: true } },
      ],
    },
  });

  // check if former accepted answer exist
  if (formerAcceptedAnswer) {
    formerAcceptedAnswer.isAcceptedAnswer = false;

    await formerAcceptedAnswer.save();
  }

  // update accepted answer
  answer.isAcceptedAnswer = true;

  await answer.save();

  // update that question hasAcceptedAnswer
  await Question.update(
    { hasAcceptedAnswer: true },
    {
      where: {
        id: answer.QuestionId,
      },
    },
  );

  return answer;
};

// export service
module.exports = updateAnswerStatusService;
