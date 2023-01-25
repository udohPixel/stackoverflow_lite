// import required modules
const ApplicationException = require('../../common/ApplicationException');
const Category = require('../../categories/models/Category');

// import Question model
const Question = require('../models/Question');

// add question service
const addQuestionService = async (UserId, title, body, CategoryId) => {
  // fetch category
  const category = await Category.findOne({
    where: { id: CategoryId },
    attributes: ['id'],
  });

  // check if category exists or not in dB
  if (!category) {
    throw new ApplicationException('Category does not exist', 404);
  }

  // fetch question
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
