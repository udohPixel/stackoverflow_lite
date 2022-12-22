// import required modules
const ApplicationException = require('../../common/ApplicationException');
const questionFilters = require('../helpers/questionFilters');
const User = require('../../users/models/User');

// get all questions service
const getAllUserQuestionsService = async (username, queryStr) => {
  // fetch user
  const user = await User.findOne({
    where: { username },
  });

  // check if user exist
  if (!user) {
    throw new ApplicationException('User does not exist', 404);
  }

  const theUserId = user.id;

  // filter questions
  const questions = questionFilters.filterPersonalItems(theUserId, queryStr);

  return questions;
};
// export service
module.exports = getAllUserQuestionsService;
