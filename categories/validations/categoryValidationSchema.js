// import require modules
const Joi = require('joi');

// user validation schema
const categoryValidatorSchema = {
  // add category validator schema
  addCategory: Joi.object({
    title: Joi.string().trim(true)
      .required(),
  }),

};

// export user validator schema
module.exports = categoryValidatorSchema;
