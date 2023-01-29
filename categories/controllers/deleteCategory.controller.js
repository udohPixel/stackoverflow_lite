/* eslint-disable no-unused-vars */
// import required modules
const apiResponse = require('../../common/ApiResponse');
const deleteCategoryService = require('../services/deleteCategory.service');

// delete/save category controller
const deleteCategoryCtrl = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // delete category service
    const category = await deleteCategoryService(categoryId);

    return apiResponse.success(res, 'Category deleted successfully', category);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'delete-category');
  }
};

// export controller
module.exports = deleteCategoryCtrl;
