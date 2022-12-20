// import required modules
const apiResponse = require('../../common/ApiResponse');
const addQuestionService = require('../services/addQuestion.service');

// add question controller
const addQuestionCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { title, body, CategoryId } = req.body;

    const UserId = req.user.id;

    // add question service
    const question = await addQuestionService(UserId, title, body, CategoryId);

    return apiResponse.success(res, 'Question added successful', question, 201);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'add-question');
  }
};

// export controller
module.exports = addQuestionCtrl;
