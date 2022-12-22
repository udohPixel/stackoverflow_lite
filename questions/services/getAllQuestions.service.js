// import required modules
const questionFilters = require('../helpers/questionFilters');

// get all questions service
const getAllQuestionsService = (queryStr) => {
  // filter questions
  const questions = questionFilters.filterItems(queryStr);

  return questions;
};
// export service
module.exports = getAllQuestionsService;
