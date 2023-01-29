// import required modules
const apiResponse = require('../../common/ApiResponse');
const upvoteAnswerService = require('../services/upvoteAnswer.service');

// upvote answer controller
const upvoteAnswerCtrl = async (req, res) => {
  try {
    const AnswerId = req.params.id;
    const UserId = req.user.id;

    // upvote answer service
    const vote = await upvoteAnswerService(AnswerId, UserId);

    return apiResponse.success(res, 'Answer upvoted successfully', vote, 200);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'upvote-answer');
  }
};

// export controller
module.exports = upvoteAnswerCtrl;
