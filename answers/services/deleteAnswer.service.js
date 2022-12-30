// import required modules
const Answer = require('../models/Answer');
const ApplicationException = require('../../common/ApplicationException');
const { isAdmin } = require('../../common/helpers');
const Role = require('../../roles/models/Role');
const Question = require('../../questions/models/Question');

// delete answer service
const deleteAnswerService = async (UserId, RoleId, answerId) => {
  // fetch answer by id from dB
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

  // fetch role by id from dB
  const role = await Role.findByPk(RoleId);

  // check if currently logged in user is creator of the answer
  if (!((UserId === answer.UserId) || isAdmin(role.title))) {
    throw new ApplicationException('Unauthorized', 401);
  }

  // delete answer
  await Answer.destroy(
    {
      where: {
        id: answerId,
      },
    },
  );

  // fetch all answers
  const allAnswers = await Answer.findAll({
    where: {
      QuestionId: Number(answer.QuestionId),
    },
  });

  // update totalAnswers
  await Question.update(
    { totalAnswers: allAnswers.length },
    {
      where: {
        id: Number(answer.QuestionId),
      },
    },
  );

  return answer;
};

// export service
module.exports = deleteAnswerService;
