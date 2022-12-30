// import required modules
const apiResponse = require('../../common/ApiResponse');
const getAllCommentsService = require('../services/getAllComments.service');

// get all comments controller
const getAllCommentsCtrl = async (req, res) => {
  try {
    const { answerId } = req.params;
    const queryStr = req.query;

    // get all comments service
    const comments = await getAllCommentsService(answerId, queryStr);

    return apiResponse.success(res, 'Comments found successfully', comments);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'get-all-comments');
  }
};

// export controller
module.exports = getAllCommentsCtrl;
