const router = require('express').Router();
const nodemailer = require('nodemailer');
const log = console.log;
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var generator = require('generate-password');
require("dotenv/config");
const { resetEmailValidation } = require("../utils/validation.js");

router.post('/', async (req, res) => {

    let emailExist = null
    let errors = null

    const { error } = resetEmailValidation({email: req.body.email});
    if (error) {
        errors = error.details
    }

    console.log('email', req.body)

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        emailExist = false
    }

    // console.log(error)
    if (error || emailExist === false) return res.status(400).send({errors: errors, emailExist: emailExist});

    var newPassword = generator.generate({
        length: 10,
        numbers: true
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    if(user) {
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
        service: 'gmail',
        auth: {
            user:  process.env.MAIL,
            pass:  process.env.PASSWORD,
        }
    });

    let mailOptions = {
        from: 'chris.cybula.test@gmail.com',
        to: 'chris.cybula.test2@gmail.com',
        subject: 'Nodemailer - Test',
        text: newPassword
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error occurs!', err);
        }
        return log('Email sent!!!');
    });

    res.send('ok')
});

module.exports = router;