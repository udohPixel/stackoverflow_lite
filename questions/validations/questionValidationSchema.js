// import require modules
const Joi = require('joi');

// user validation schema
const questionValidatorSchema = {
  // add question validator schema
  addQuestion: Joi.object({
    title: Joi.string().min(2).max(255).required(),
    body: Joi.string().min(6).max(5000).required(),
    CategoryId: Joi.number().integer().required(),
  }),

  // update personal question validator schema
  updatePersonalQuestion: Joi.object({
    title: Joi.string().min(2).max(255).required(),
    body: Joi.string().min(6).max(5000).required(),
    CategoryId: Joi.number().integer().required(),
  }),
};

// export user validator schema
module.exports = questionValidatorSchema;
