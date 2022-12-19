// import required modules
const Category = require('../models/Category');

// get all categories service
const getAllCategoriesService = () => {
  // filter categories
  const categories = Category.findAll();

  return categories;
};
// export service
module.exports = getAllCategoriesService;
