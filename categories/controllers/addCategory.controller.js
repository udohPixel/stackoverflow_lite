// import required modules
const apiResponse = require('../../common/ApiResponse');
const addCategoryService = require('../services/addCategory.service');

// add category controller
const addCategoryCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { title } = req.body;

    // add category service
    const category = await addCategoryService(title);

    return apiResponse.success(res, 'Category added successfully', category, 201);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'add-category');
  }
};

// export controller
module.exports = addCategoryCtrl;
