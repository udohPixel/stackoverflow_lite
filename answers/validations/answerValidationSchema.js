// import require modules
const Joi = require('joi');

// user validation schema
const answerValidatorSchema = {
  // add answer validator schema
  addAnswer: Joi.object({
    body: Joi.string().min(6).max(2500).required(),
    QuestionId: Joi.number().integer().required(),
  }),

  // update personal answer validator schema
  updatePersonalAnswer: Joi.object({
    body: Joi.string().min(6).max(2500).required(),
    QuestionId: Joi.number().integer().required(),
  }),
};

// export user validator schema
module.exports = answerValidatorSchema;
