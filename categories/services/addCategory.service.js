// import required modules
const ApplicationException = require('../../common/ApplicationException');

// import Category model
const Category = require('../models/Category');

// register service
const registrationService = async (title) => {
  // fetch category by email from dB
  const category = await Category.findOne({
    where: { title },
  });

  // check if category exists or not in dB
  if (category) {
    throw new ApplicationException('Category has already been added. Try another');
  }

  // save new category object in DB
  const newCategory = Category.create({
    title,
  });

  return newCategory;
};

// export service
module.exports = registrationService;
