const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {registerValidation, loginValidation } = require("../utils/validation.js");
const jwt = require('jsonwebtoken')

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  const nameExist = await User.findOne({ name: req.body.name });
  if (nameExist) return res.status(400).send("Name already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({$or: [{email: req.body.nameOrEmail}, {name : req.body.nameOrEmail}]});
  if (!user) return res.status(400).send("Email doesn't exist");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send("Wrong password");

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token);
  res.header("Access-Control-Expose-Headers", "auth-token");
  
  res.send(user)
});

module.exports = router;
