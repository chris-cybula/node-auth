const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
    .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case "string.empty":
              err.message = "Username can't be blank";
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
              err.message = "Email can't be blank";
            break;
            case "string.email":
              err.message = `Email is invalid`;
            break;
          }
        });
        return errors;
      }),

    password: Joi.string()
      .required()
      .min(8)
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case "string.empty":
              err.message = "Password can't be blank";
              break;
            case "string.min":
              err.message = `Password is too short (minimum is 8 characters)`;
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
            err.message = "Username or email can't be blank";
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
            err.message = "Password can't be blank";
            break;
        }
      });
      return errors;
    }),
  }).options({abortEarly : false});

  return schema.validate(data);
};

const resetEmailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required()
      .email()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case "string.empty":
              err.message = "Email can't be blank";
            break;
            case "string.email":
              err.message = `Email is invalid`;
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
    name: Joi.string().required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "New username can't be blank";
          break;
        }
      });
      return errors;
    }),
}).options({abortEarly : false});

  return schema.validate(data);
};

const changeEmailValidation = (data) => {
  const schema = Joi.object({
    oldEmail: Joi.string().required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Old email can't be blank";
          break;
        }
      });
      return errors;
    }),
    newEmail: Joi.string().required().email()
    .error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "New email can't be blank";
          break;
          case "string.email":
              err.message = `New email is invalid`;
          break;
        }
      });
      return errors;
    }),
    confirmedEmail: Joi.string().required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Confirmed email can't be blank";
          break;
        }
      });
      return errors;
    }),
  }).options({abortEarly : false});

  return schema.validate(data);
};

const changePasswordValidation = (data) => {
  const schema = Joi.object({
    oldPassword: Joi.string().required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Old password can't be blank";
          break;
        }
      });
      return errors;
    }),
    newPassword: Joi.string().min(6).required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "New password can't be blank";
          break;
          case "string.min":
              err.message = `Password is too short (minimum is 8 characters)`;
          break;
        }
      });
      return errors;
    }),
    confirmedPassword: Joi.string().required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Confirmed password can't be blank";
          break;
        }
      });
      return errors;
    }),
  }).options({abortEarly : false});

  return schema.validate(data);
};

const deleteValidation = (data) => {
  const schema = Joi.object({
    nameOrEmail: Joi.string().required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Username or email can't be blank";
          break;
        }
      });
      return errors;
    }),
    verification: Joi.string().required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Username or email can't be blank";
          break;
        }
      });
      return errors;
    }),
  }).options({abortEarly : false});

  return schema.validate(data);
};

const appValidation = (data) => {
  const schema = Joi.object({
    item: Joi.string()
    .error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Item can't be blank";
          break;
        }
      });
      return errors;
    }),
  }).options({abortEarly : false});

  return schema.validate(data);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.resetEmailValidation = resetEmailValidation;
module.exports.changeNameValidation = changeNameValidation;
module.exports.changeEmailValidation = changeEmailValidation;
module.exports.changePasswordValidation = changePasswordValidation;
module.exports.deleteValidation = deleteValidation;
module.exports.appValidation = appValidation;



