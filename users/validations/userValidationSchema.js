// import require modules
const Joi = require('joi');
// const validatorConfig = require('../../settings/validator.config');

// user validation schema
const userValidatorSchema = {
  // login validator schema
  login: Joi.object({
    email: Joi.string()
      .lowercase()
      .min(6)
      .max(50)
      .email({ minDomainSegments: 2 })
      .trim(true)
      .required(),
    password: Joi.string()
      .min(8)
      .max(32)
      .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/,
      )
      .required()
      .label('Password')
      .messages({
        'string.min': 'Must have at least 8 characters',
        'string.max': 'Must not have more than 32 characters',
        'string.pattern.base': 'Password must be between 8 and 32 characters. '
        + 'Must have at least 1 letter and 1 number. '
        + 'Must have at least 1 special character.',
      }),
  }),

  // registration validator schema
  registration: Joi.object({
    firstname: Joi.string().min(2).max(50).trim(true)
      .required(),
    lastname: Joi.string().min(2).max(50).trim(true)
      .required(),
    username: Joi.string().min(3).max(50).trim(true)
      .required(),
    email: Joi.string()
      .lowercase()
      .min(6)
      .max(50)
      .email({
        minDomainSegments: 2,
      })
      .trim(true)
      .required(),
    password: Joi.string()
      .min(8)
      .max(32)
      .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/,
      )
      .required()
      .label('Password')
      .messages({
        'string.min': 'Must have at least 8 characters',
        'string.max': 'Must not have more than 32 characters',
        'string.pattern.base': 'Password must be between 8 and 32 characters. '
        + 'Must have at least 1 letter and 1 number. '
        + 'Must have at least 1 special character.',
      }),
  }),

  // update personal user validator schema
  updatePersonalUser: Joi.object({
    firstname: Joi.string().min(2).max(50).trim(true)
      .required(),
    lastname: Joi.string().min(2).max(50).trim(true)
      .required(),
    username: Joi.string().min(3).max(50).trim(true)
      .required(),
    email: Joi.string()
      .lowercase()
      .min(6)
      .max(50)
      .email({
        minDomainSegments: 2,
      })
      .trim(true)
      .required(),
    bio: Joi.string().min(10).max(5000).allow(''),
    facebook: Joi.string().min(3).max(50).trim(true)
      .allow(''),
    youtube: Joi.string().min(3).max(50).trim(true)
      .allow(''),
    instagram: Joi.string().min(3).max(50).trim(true)
      .allow(''),
    linkedIn: Joi.string().min(3).max(50).trim(true)
      .allow(''),
    twitter: Joi.string().min(3).max(50).trim(true)
      .allow(''),
  }),

  // update personal password validator schema
  updatePersonalPassword: Joi.object({
    oldPassword: Joi.string()
      .min(8)
      .max(32)
      .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/,
      )
      .required()
      .label('Old Password')
      .messages({
        'string.min': 'Must have at least 8 characters',
        'string.max': 'Must not have more than 32 characters',
        'string.pattern.base': 'Password must be between 8 and 32 characters. '
        + 'Must have at least 1 letter and 1 number. '
        + 'Must have at least 1 special character.',
      }),
    password: Joi.string()
      .min(8)
      .max(32)
      .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/,
      )
      .required()
      .label('New password')
      .messages({
        'string.min': 'Must have at least 8 characters',
        'string.max': 'Must not have more than 32 characters',
        'string.pattern.base': 'Password must be between 8 and 32 characters. '
        + 'Must have at least 1 letter and 1 number. '
        + 'Must have at least 1 special character.',
      }),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .options({ messages: { 'any.only': '{{#label}} does not match' } }),
  }),

  // update user validator schema
  updateUser: Joi.object({
    firstname: Joi.string().min(2).max(50).trim(true)
      .required(),
    lastname: Joi.string().min(2).max(50).trim(true)
      .required(),
    username: Joi.string().min(3).max(50).trim(true)
      .required(),
    email: Joi.string()
      .lowercase()
      .min(6)
      .max(50)
      .email({
        minDomainSegments: 2,
      })
      .trim(true)
      .required(),
    RoleId: Joi.string(),
    bio: Joi.string().min(10).max(5000),
    facebook: Joi.string().min(3).max(50).trim(true)
      .allow(''),
    youtube: Joi.string().min(3).max(50).trim(true)
      .allow(''),
    instagram: Joi.string().min(3).max(50).trim(true)
      .allow(''),
    linkedIn: Joi.string().min(3).max(50).trim(true)
      .allow(''),
    twitter: Joi.string().min(3).max(50).trim(true)
      .allow(''),
  }),
};

// export user validator schema
module.exports = userValidatorSchema;
