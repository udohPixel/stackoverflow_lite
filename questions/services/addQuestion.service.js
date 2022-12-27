// import required modules
const ApplicationException = require('../../common/ApplicationException');

// import Question model
const Question = require('../models/Question');

// add question service
const addQuestionService = async (UserId, title, body, CategoryId) => {
  // fetch question by email from dB
  const question = await Question.findOne({
    where: { title },
  });

  // check if question exists or not in dB
  if (question) {
    throw new ApplicationException('Question has already been added. Try another');
  }

  // save new question object in DB
  const newQuestion = Question.create({
    UserId, title, body, CategoryId: Number(CategoryId),
  });

  return newQuestion;
};

// export service
module.exports = addQuestionService;
