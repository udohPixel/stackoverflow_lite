// import required modules
const userFilters = require('../helpers/userFilters');

// get all users service
const getAllUsersService = async (queryStr) => {
  // filter users
  const users = userFilters.filterItems(queryStr);

  return users;
};
// export service
module.exports = getAllUsersService;
