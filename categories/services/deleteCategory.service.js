// import required modules
const Category = require('../models/Category');
const ApplicationException = require('../../common/ApplicationException');

// delete category service
const deleteCategoryService = async (categoryId) => {
  // fetch category by id from dB
  const category = await Category.findOne(
    {
      where: {
        id: categoryId,
      },
    },
  );

  // check if category already exits in dB
  if (!category) {
    throw new ApplicationException('Category does not exist', 404);
  }

  // delete category
  await Category.destroy(
    {
      where: {
        id: categoryId,
      },
    },
  );

  return category;
};

// export service
module.exports = deleteCategoryService;
