const router = require("express").Router();
const verify = require("../utils/verifyToken");
const User = require("../models/User");
const {
  changeNameValidation,
  changeEmailValidation,
  changePasswordValidation,
  deleteValidation,
} = require("../utils/validation.js");
const bcrypt = require("bcryptjs");

router.post("/name", verify, async (req, res) => {
  let name = null;
  let errors = null;

  const { error } = changeNameValidation({ name: req.body[1].newName });
  if (error) {
    errors = error.details;
  }

  const nameExist = await User.findOne({ name: req.body[1].newName });
  if (nameExist) {
    name = true;
  }

  if (error || name === true)
    return res.status(400).send({ errors: errors, name: name });

  try {
    User.findByIdAndUpdate(req.user, {
      $set: { name: req.body[1].newName },
    }).exec();
    res.json("ok");
  } catch (err) {
    res.json(err);
  }
});

router.post("/email", verify, async (req, res) => {
  const data = await User.find({ _id: req.user });
  let errors = null;
  let oldEmail = null;
  let newEmail = null;
  let confirmedEmail = null;

  const { error } = changeEmailValidation({
    oldEmail: req.body[1].oldEmail,
    newEmail: req.body[1].newEmail,
    confirmedEmail: req.body[1].confirmedEmail,
  });

  if (error) {
    errors = error.details;
  }

  if (req.body[1].oldEmail !== "" && req.body[1].oldEmail !== data[0].email) {
    oldEmail = false;
  }

  const emailExists = await User.findOne({ email: req.body[1].newEmail });
  if (emailExists) {
    newEmail = true;
  }

  if (
    req.body[1].confirmedEmail !== "" &&
    req.body[1].newEmail !== req.body[1].confirmedEmail
  ) {
    confirmedEmail = false;
  }

  if (
    error ||
    oldEmail === false ||
    newEmail === true ||
    confirmedEmail === false
  )
    return res.status(400).send({
      errors: errors,
      oldEmail: oldEmail,
      newEmail: newEmail,
      confirmedEmail: confirmedEmail,
    });

  try {
    User.findByIdAndUpdate(req.user, {
      $set: { email: req.body[1].newEmail },
    }).exec();
    res.json("ok");
  } catch (err) {
    res.json(err);
  }

  res.send("ok");
});

router.post("/password", verify, async (req, res) => {
  const data = await User.find({ _id: req.user });

  const validPass = await bcrypt.compare(
    req.body[1].oldPassword,
    data[0].password
  );
  let errors = null;
  let oldPassword = null;
  let newPassword = null;
  let confirmedPassword = null;

  const { error } = changePasswordValidation({
    oldPassword: req.body[1].oldPassword,
    newPassword: req.body[1].newPassword,
    confirmedPassword: req.body[1].confirmedPassword,
  });

  if (error) {
    errors = error.details;
  }

  if (req.body[1].oldPassword !== "" && !validPass) {
    oldPassword = false;
  }

  if (
    req.body[1].newPassword !== "" &&
    req.body[1].oldPassword === req.body[1].newPassword
  ) {
    newPassword = false;
  }

  if (
    req.body[1].confirmedPassword !== "" &&
    req.body[1].newPassword !== req.body[1].confirmedPassword
  ) {
    confirmedPassword = false;
  }

  if (
    error ||
    newPassword === false ||
    oldPassword === false ||
    confirmedPassword === false
  )
    return res.status(400).send({
      errors: errors,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmedPassword: confirmedPassword,
    });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body[1].newPassword, salt);

  try {
    User.findByIdAndUpdate(req.user, {
      $set: { password: hashedPassword },
    }).exec();
    res.json("ok");
  } catch (err) {
    res.json(err);
  }

  res.send("ok");
});

router.post("/delete", verify, async (req, res) => {
  const user = await User.find({ _id: req.body[0] });
  let errors = null;
  let nameOrEmail = null;
  let verification = null;

  const { error } = deleteValidation({
    nameOrEmail: req.body[1].nameOrEmail,
    verification: req.body[1].verification,
  });
  if (error) {
    errors = error.details;
  }

  if (
    req.body[1].nameOrEmail !== "" &&
    req.body[1].nameOrEmail === user[0].name
  ) {
    nameOrEmail = true;
  }

  if (
    req.body[1].nameOrEmail !== "" &&
    req.body[1].nameOrEmail === user[0].email
  ) {
    nameOrEmail = true;
  }

  if (
    req.body[1].verification !== "" &&
    req.body[1].verification !== "delete my account"
  ) {
    verification = false;
  }

  if (error || nameOrEmail !== true || verification === false)
    return res.status(400).send({
      errors: errors,
      nameOrEmail: nameOrEmail,
      verification: verification,
    });

  await User.deleteOne({ _id: req.body[0] });
  res.clearCookie("user");

  res.json(errors);
});

module.exports = router;
