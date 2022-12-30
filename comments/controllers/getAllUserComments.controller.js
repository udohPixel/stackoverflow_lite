// import required modules
const apiResponse = require('../../common/ApiResponse');
const getAllUserCommentsService = require('../services/getAllUserComments.service');

// get all user comments controller
const getAllUserCommentsCtrl = async (req, res) => {
  try {
    const { username } = req.params;
    const queryStr = req.query;

    // get all user comments service
    const comments = await getAllUserCommentsService(username, queryStr);

    return apiResponse.success(res, 'Comments found successfully', comments);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'get-all-user-comments');
  }
};

// export controller
module.exports = getAllUserCommentsCtrl;
