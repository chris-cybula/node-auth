const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
    .required()
      .min(6)
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case "string.empty":
              err.message = "Value should not be empty!!!";
              break;
            case "string.min":
              err.message = `Value should have at least 6 characters!!!`;
              break;
          }
        });
        return errors;
      }),

    email: Joi.string()
      .required()
      .email()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case "string.empty":
              err.message = "Value should not be empty!!!";
            break;
            case "string.email":
              err.message = `Value should be a valid email!!!`;
            break;
          }
        });
        return errors;
      }),

    password: Joi.string()
      .required()
      .min(6)
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case "string.empty":
              err.message = "Password should not be empty!!!";
              break;
            case "string.min":
              err.message = `Password should have at least 6 characters!!!`;
              break;
          }
        });
        return errors;
      }),

  }).options({abortEarly : false});

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    nameOrEmail: Joi.string().required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Can not be empty!!!";
            break;
        }
      });
      return errors;
    }),
    password: Joi.string().required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Can not be empty!!!";
            break;
        }
      });
      return errors;
    }),
  }).options({abortEarly : false});

  return schema.validate(data);
};

const changeNameValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required()
  })

  return schema.validate(data);
};

const changeEmailValidation = (data) => {
  const schema = Joi.object({
    newEmail: Joi.string().min(6).required().email(),
    confirmedEmail: Joi.string().required(),
  });

  return schema.validate(data);
};

const changePasswordValidation = (data) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(6).required(),
    confirmedPassword: Joi.string().required(),
  });

  return schema.validate(data);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

module.exports.changeNameValidation = changeNameValidation;
module.exports.changeEmailValidation = changeEmailValidation;
module.exports.changePasswordValidation = changePasswordValidation;



