const router = require('express').Router();
const nodemailer = require('nodemailer');
const log = console.log;
const User = require("../models/User");

router.post('/', async (req, res) => {

    console.log(req.body.email)

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email doesn't exist");

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
        text: 'Wooohooo it works3!!'
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