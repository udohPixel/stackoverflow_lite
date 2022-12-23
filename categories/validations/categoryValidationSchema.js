// import require modules
const Joi = require('joi');

// user validation schema
const categoryValidatorSchema = {
  // add category validator schema
  addCategory: Joi.object({
    title: Joi.string().min(2).max(50).required(),
  }),

  // update category validator schema
  updateCategory: Joi.object({
    title: Joi.string().min(2).max(50).required(),
  }),

};

// export user validator schema
module.exports = categoryValidatorSchema;
