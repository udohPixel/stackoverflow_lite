// import required libraries
const express = require('express');

// import required middlewares
const { isLoggedIn, isTheAdmin } = require('../../../../users/middlewares/auth');
const {
  isAddCategoryValidated,
  isUpdateCategoryValidated,
} = require('../../../middlewares/categoryValidator');

// import required controllers
const addCategory = require('../../../controllers/addCategory.controller');
const getAllCategories = require('../../../controllers/getAllCategories.controller');
const updateCategory = require('../../../controllers/updateCategory.controller');
const deleteCategory = require('../../../controllers/deleteCategory.controller');

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for updating personal category
 * @api     - /api/v1/categories
 * @access  - PRIVATE
 * @type    - POST
 */
router.post('/', isLoggedIn, isTheAdmin, isAddCategoryValidated, addCategory);

/**
 * @desc    - route for fetching all categories
 * @api     - /api/v1/categories
 * @access  - PRIVATE
 * @type    - GET
 */
router.get('/', isLoggedIn, isTheAdmin, getAllCategories);

/**
 * @desc    - route for updating category
 * @api     - /api/v1/categories/:id
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put('/:id', isLoggedIn, isTheAdmin, isUpdateCategoryValidated, updateCategory);

/**
 * @desc    - route for delete category
 * @api     - /api/v1/categories/:id
 * @access  - PRIVATE
 * @type    - PUT
 */
router.delete('/:id', isLoggedIn, isTheAdmin, deleteCategory);

// export router
module.exports = router;
