const router = require('express').Router();
const verify = require('../utils/verifyToken')
const User = require("../models/User");
const { changeNameValidation, changeEmailValidation, changePasswordValidation } = require("../utils/validation.js");
const bcrypt = require("bcryptjs");

router.post('/name', verify, async (req, res) => {
    const { error } = changeNameValidation({name: req.body[1].newName});
    if (error) return res.status(400).send(error.details[0].message);

    try {
        User.findByIdAndUpdate(req.user, { $set: { name: req.body[1].newName } }).exec();
        res.json('ok');
      } catch (err) {
        res.json(err);
      }
});

router.post('/email', verify, async (req, res) => {

    const data = await User.find( { _id: req.user });

    //old

    if(req.body[1].oldEmail === '') return res.status(400).send("Old email empty");
    if(req.body[1].oldEmail !== data[0].email) return res.status(400).send("Wrong old email");

    //new

    const { error } = changeEmailValidation({
        newEmail: req.body[1].newEmail,
        confirmedEmail: req.body[1].confirmedEmail
    });

    if (error) return res.status(400).send(error.details[0].message);

    //confirmed

    if(req.body[1].newEmail !== req.body[1].confirmedEmail) return res.status(400).send("Emails are not the same");

    //update

    if(req.body[1].oldEmail === req.body[1].newEmail) return res.status(400).send("New email is the same");

    try {
        User.findByIdAndUpdate(req.user, { $set: { email: req.body[1].newEmail } }).exec();
        res.json('ok');
      } catch (err) {
        res.json(err);
      }

    res.send('ok')

});

router.post('/password', verify, async (req, res) => {

    const data = await User.find( { _id: req.user });

    //old

    if(req.body[1].oldPassword === '') return res.status(400).send("Old pass empty");

    const validPass = await bcrypt.compare(req.body[1].oldPassword, data[0].password);
    if(!validPass) return res.status(400).send("Wrong old pass");


    //new

    const { error } = changePasswordValidation({
        newPassword: req.body[1].newPassword,
        confirmedPassword: req.body[1].confirmedPassword
    });

    if (error) return res.status(400).send(error.details[0].message);

    //confirmed

    if(req.body[1].newPassword !== req.body[1].confirmedPassword) return res.status(400).send("Passwords are not the same");

    //update

    if(req.body[1].oldPassword === req.body[1].newPassword) return res.status(400).send("New pass is the same");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body[1].newPassword, salt);

    try {
        User.findByIdAndUpdate(req.user, { $set: { password: hashedPassword } }).exec();
        res.json('ok');
      } catch (err) {
        res.json(err);
      }

    res.send('ok')

});

module.exports = router;