// import required modules
const apiResponse = require('../../common/ApiResponse');

const {
  addCategory,
} = require('../validations/categoryValidationSchema');

// is add category values validated
const isAddCategoryValidated = async (req, res, next) => {
  // validate category-imputed values
  const categoryValidator = await addCategory.validate(req.body);

  // check if user-imputed values had errors
  if (categoryValidator.error) {
    apiResponse.error(res, categoryValidator.error?.message);
  } else {
    next();
  }
};

// export
module.exports = {
  isAddCategoryValidated,
};
