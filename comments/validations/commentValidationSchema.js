// import require modules
const Joi = require('joi');

// user validation schema
const commentValidatorSchema = {
  // add comment validator schema
  addComment: Joi.object({
    body: Joi.string().min(6).max(2500).required(),
    AnswerId: Joi.number().integer().required(),
  }),
};

// export user validator schema
module.exports = commentValidatorSchema;
