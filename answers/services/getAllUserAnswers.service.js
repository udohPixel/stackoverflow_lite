// import required modules
const ApplicationException = require('../../common/ApplicationException');
const answerFilters = require('../helpers/answerFilters');
const User = require('../../users/models/User');

// get all answers service
const getAllUserAnswersService = async (username, queryStr) => {
  // fetch user
  const user = await User.findOne({
    where: { username },
  });

  // check if user exist
  if (!user) {
    throw new ApplicationException('User does not exist', 404);
  }

  const theUserId = user.id;

  // filter answers
  const answers = answerFilters.filterPersonalItems(theUserId, queryStr);

  return answers;
};
// export service
module.exports = getAllUserAnswersService;
