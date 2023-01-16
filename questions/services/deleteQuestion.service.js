// import required modules
const Question = require('../models/Question');
const ApplicationException = require('../../common/ApplicationException');
const { isAdmin } = require('../../common/helpers');
const Role = require('../../roles/models/Role');

// delete question service
const deleteQuestionService = async (UserId, RoleId, questionId) => {
  // fetch question by id from dB
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

  // fetch role by id from dB
  const role = await Role.findByPk(RoleId);

  // check if currently logged in user is creator of the question
  if (!(UserId === question.UserId || isAdmin(role.title))) {
    throw new ApplicationException('You are not allowed to delete question', 403);
  }

  // delete question
  await Question.destroy(
    {
      where: {
        id: questionId,
      },
    },
  );

  return question;
};

// export service
module.exports = deleteQuestionService;
