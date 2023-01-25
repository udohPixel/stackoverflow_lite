// import required modules
const Question = require('../models/Question');
const Category = require('../../categories/models/Category');
const ApplicationException = require('../../common/ApplicationException');

// update question service
const updateQuestionService = async (UserId, questionId, title, body, CategoryId) => {
  // fetch category
  const category = await Category.findOne({
    where: { id: CategoryId },
    attributes: ['id'],
  });

  // check if category exists or not in dB
  if (!category) {
    throw new ApplicationException('Category does not exist', 404);
  }

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
    throw new ApplicationException('You are not allowed to update question', 403);
  }

  // update question
  question.title = title;
  question.body = body;
  question.CategoryId = Number(CategoryId);
  question.UserId = UserId;

  const updatedQuestion = await question.save();

  return updatedQuestion;
};

// export service
module.exports = updateQuestionService;
