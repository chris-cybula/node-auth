const router = require("express").Router();
const nodemailer = require("nodemailer");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var generator = require("generate-password");
const { resetEmailValidation } = require("../utils/validation.js");
require("dotenv/config");

router.post("/", async (req, res) => {
  let emailExist = null;
  let errors = null;

  const { error } = resetEmailValidation({ email: req.body.email });
  if (error) {
    errors = error.details;
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    emailExist = false;
  }

  if (error || emailExist === false)
    return res.status(400).send({ errors: errors, emailExist: emailExist });

  var newPassword = generator.generate({
    length: 10,
    numbers: true,
  });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  if (user) {
    try {
      const updatedItem = await User.updateOne(
        { email: user.email },
        { $set: { password: hashedPassword } }
      );
      res.json(updatedItem);
    } catch (err) {
      res.json(err);
    }
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.MAIL,
    to: req.body.email,
    subject: "App new password",
    text: newPassword,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send("ok");
  });
});

module.exports = router;
