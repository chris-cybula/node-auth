const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {registerValidation, loginValidation } = require("../utils/validation.js");
const jwt = require('jsonwebtoken')

router.post("/register", async (req, res) => {
  let nameExist = null
  let emailExist = null
  let errors = null
  
  const userName = await User.findOne({ name: req.body.name });
  if (userName) {
    nameExist = true
  }

  const userEmail = await User.findOne({ email: req.body.email });
  if (userEmail) {
    emailExist = true
  }

  const { error } = registerValidation(req.body);
  if (error) {
    errors = error.details
  }

  if (error || nameExist === true || emailExist === true ) return res.status(400).send({errors: errors, emailExist: emailExist, nameExist: nameExist});

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

router.post("/login", async (req, res, next) => {

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({$or: [{email: req.body.nameOrEmail}, {name : req.body.nameOrEmail}]});
    if (!user) return res.status(400).send("Email doesn't exist");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Wrong password");

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

    res.header('auth-token', token);
    res.header("Access-Control-Expose-Headers", "auth-token");

    res.cookie('user', token, { maxAge: 900000, httpOnly: true, secure: false })
    res.send('ok')
 

  next();
  
});

router.post("/cookie", async (req, res, next) => {

  //If cookie
  if (req.cookies["user"]) {

    res.header('auth-token', req.cookies["user"]);
    res.header("Access-Control-Expose-Headers", "auth-token");

    res.send('cookie')

  } else {

    res.send('no cookie')
  }

  next();
  
});

router.post("/clear-cookie", async (req, res, next) => {

 
    res.clearCookie("user");
    res.send('cookie cleared')
  

  next();
  
});


module.exports = router;
