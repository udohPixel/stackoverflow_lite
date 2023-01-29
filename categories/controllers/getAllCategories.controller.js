// import required modules
const apiResponse = require('../../common/ApiResponse');
const getAllCategoriesService = require('../services/getAllCategories.service');

// get all categories controller
const getAllCategoriesCtrl = async (req, res) => {
  try {
    // get all categories service
    const categories = await getAllCategoriesService();

    return apiResponse.success(res, 'Categories found successfully', categories);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'get-all-categories');
  }
};

// export controller
module.exports = getAllCategoriesCtrl;
