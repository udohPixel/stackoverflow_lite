// import required modules
const apiResponse = require('../../common/ApiResponse');

const {
  addComment,
} = require('../validations/commentValidationSchema');

// is add comment values validated
const isAddCommentValidated = async (req, res, next) => {
  // validate user-imputed values
  const commentValidator = await addComment.validate(req.body);

  // check if user-imputed values had errors
  if (commentValidator.error) {
    apiResponse.error(res, commentValidator.error?.message);
  } else {
    next();
  }
};

// export
module.exports = {
  isAddCommentValidated,
};
