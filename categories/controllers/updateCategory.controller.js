/* eslint-disable no-unused-vars */
// import required modules
const apiResponse = require('../../common/ApiResponse');
const updateCategoryService = require('../services/updateCategory.service');

// update/save category controller
const updateCategoryCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { title } = req.body;
    const categoryId = req.params.id;

    // update category service
    const category = await updateCategoryService(categoryId, title);

    return apiResponse.success(res, 'Category updated successfully', category);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'update-category');
  }
};

// export controller
module.exports = updateCategoryCtrl;
