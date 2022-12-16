// import required modules
const apiResponse = require('../../common/ApiResponse');
const getUserService = require('../services/getUser.service');

// get user controller
const getUserCtrl = async (req, res) => {
  try {
    const theUsername = req.params.username;

    // get user service
    const user = await getUserService(theUsername);

    return apiResponse.success(res, 'User found successfully', user);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'get-user');
  }
};

// export controller
module.exports = getUserCtrl;
