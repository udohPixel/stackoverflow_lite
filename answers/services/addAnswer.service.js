// import required modules
const ApplicationException = require('../../common/ApplicationException');
const Question = require('../../questions/models/Question');

// import Answer model
const Answer = require('../models/Answer');

// add answer service
const addAnswerService = async (UserId, body, QuestionId) => {
  // fetch answer
  const answer = await Answer.findOne({
    where: { body },
  });

  // check if answer exists or not in dB
  if (answer) {
    throw new ApplicationException('Answer has already been added. Try another');
  }

  // save new answer object in DB
  const newAnswer = Answer.create({
    UserId, body, QuestionId: Number(QuestionId),
  });

  // fetch all answers
  const allAnswers = await Answer.findAll({
    where: {
      QuestionId: Number(QuestionId),
    },
  });

  // update totalAnswers
  await Question.update(
    { totalAnswers: allAnswers.length + 1 },
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
