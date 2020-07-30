const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    nameOrEmail: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const changeNameValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required()
  });

  return schema.validate(data);
};

const changeEmailValidation = (data) => {
  const schema = Joi.object({
    newEmail: Joi.string().min(6).required().email(),
    confirmedEmail: Joi.string().required(),
  });

  return schema.validate(data);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

module.exports.changeNameValidation = changeNameValidation;
module.exports.changeEmailValidation = changeEmailValidation;


