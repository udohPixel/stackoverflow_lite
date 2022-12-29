// import required modules
const apiResponse = require('../../common/ApiResponse');
const addVoteService = require('../services/upvoteAnswer.service');

// add vote controller
const upvoteAnswerCtrl = async (req, res) => {
  try {
    // // object destructuring assignment
    // const { productId, quantity } = req.body;

    const AnswerId = req.params.id;
    const UserId = req.user.id;

    // add vote service
    const vote = await addVoteService(AnswerId, UserId);

    return apiResponse.success(res, 'Answer upvoted successfully', vote, 200);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'upvote-answer');
  }
};

// export controller
module.exports = upvoteAnswerCtrl;
