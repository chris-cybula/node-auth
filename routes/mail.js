const router = require('express').Router();
const nodemailer = require('nodemailer');
const log = console.log;

router.get('/', (req, res) => {
    res.send(req.user);

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
});

module.exports = router;