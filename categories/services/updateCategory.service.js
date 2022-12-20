// import required modules
const Category = require('../models/Category');
const ApplicationException = require('../../common/ApplicationException');

// update category service
const updateCategoryService = async (categoryId, title) => {
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

  // update category
  await Category.update(
    { title },
    {
      where: {
        id: categoryId,
      },
    },
  );

  // get updated category
  const updatedCategory = await Category.findByPk(categoryId);

  return updatedCategory;
};

// export service
module.exports = updateCategoryService;
