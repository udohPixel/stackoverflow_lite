// import required modules
const ApplicationException = require('../../common/ApplicationException');
const commentFilters = require('../helpers/commentFilters');
const User = require('../../users/models/User');

// get all comments service
const getAllUserCommentsService = async (username, queryStr) => {
  // fetch user
  const user = await User.findOne({
    where: { username },
  });

  // check if user exist
  if (!user) {
    throw new ApplicationException('User does not exist', 404);
  }

  const theUserId = user.id;

  // filter comments
  const comments = commentFilters.filterPersonalItems(theUserId, queryStr);

  return comments;
};
// export service
module.exports = getAllUserCommentsService;
