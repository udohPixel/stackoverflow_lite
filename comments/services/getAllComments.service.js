// import required modules
const ApplicationException = require('../../common/ApplicationException');
const Answer = require('../../answers/models/Answer');
const commentFilters = require('../helpers/commentFilters');

// get all comments service
const getAllCommentsService = async (answerId, queryStr) => {
  // fetch answer by id
  const answer = await Answer.findByPk(answerId);

  // check if answer already exist
  if (!answer) {
    throw new ApplicationException('Answer does not exist', 404);
  }

  // filter comments
  const comments = commentFilters.filterItems(answerId, queryStr);

  return comments;
};
// export service
module.exports = getAllCommentsService;
