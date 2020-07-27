const router = require('express').Router();
const nodemailer = require('nodemailer');
const log = console.log;
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var generator = require('generate-password');

router.post('/', async (req, res) => {

    console.log(req.body.email)

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email doesn't exist");

    console.log(user.password)

    var newPassword = generator.generate({
        length: 10,
        numbers: true
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    if(user) {
        try {
            const updatedItem = await User.updateOne(
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
            user:  'chris.cybula.test@gmail.com',
            pass:  'Delasoul31test'
        }
    });

    // Step 2
    let mailOptions = {
        from: 'chris.cybula.test@gmail.com',
        to: 'chris.cybula.test2@gmail.com',
        subject: 'Nodemailer - Test',
        text: newPassword
    };

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error occurs!', err);
        }
        return log('Email sent!!!');
    });

    res.send('ok')

});

module.exports = router;