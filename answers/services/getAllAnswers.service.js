// import required modules
const ApplicationException = require('../../common/ApplicationException');
const Question = require('../../questions/models/Question');
const answerFilters = require('../helpers/answerFilters');

// get all answers service
const getAllAnswersService = async (questionId, queryStr) => {
  // fetch question by id
  const question = await Question.findByPk(questionId);

  // check if question already exist
  if (!question) {
    throw new ApplicationException('Question does not exist', 404);
  }

  // filter answers
  const answers = answerFilters.filterItems(questionId, queryStr);

  return answers;
};
// export service
module.exports = getAllAnswersService;
