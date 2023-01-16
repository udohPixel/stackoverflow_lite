// import required modules
const ApplicationException = require('../../common/ApplicationException');
const { sequelize } = require('../../providers/db');
const Question = require('../../questions/models/Question');

// import Answer model
const Answer = require('../models/Answer');

// add answer service
const addAnswerService = async (UserId, body, QuestionId) => {
  // fetch question
  const question = await Question.findOne({
    where: { id: QuestionId },
  });

  // check if question exists or not in dB
  if (!question) {
    throw new ApplicationException('Question does not exist', 404);
  }

  // save new answer object in DB
  const newAnswer = Answer.create({
    UserId, body, QuestionId: Number(QuestionId),
  });

  // update totalAnswers
  await Question.update(
    { totalAnswers: sequelize.literal('totalAnswers + 1') },
    {
      where: {
        id: Number(QuestionId),
      },
    },
  );

  return newAnswer;
};

// export service
module.exports = addAnswerService;
