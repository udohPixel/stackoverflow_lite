// import required modules
const ApplicationException = require('../../common/ApplicationException');

// import Answer model
const Answer = require('../models/Answer');

// add answer service
const addAnswerService = async (UserId, body, QuestionId) => {
  // fetch answer by email from dB
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

  return newAnswer;
};

// export service
module.exports = addAnswerService;
