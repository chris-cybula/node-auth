const express = require("express");
const router = express.Router();
const verify = require('../utils/verifyToken')

//import schema
const Item = require("../models/Item");
const User = require("../models/User");

const nodemailer = require('nodemailer');
const log = console.log;


//get data
router.get("/", verify, async (req, res) => {

  try {
    const data = await User.find( { _id: req.user });
    res.json(data);
  } catch (err) {
    res.json(err);
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

//post data
router.post("/", verify, async (req, res) => {

  try {
    User.findByIdAndUpdate(req.user, { $push: { data: req.body.item } }).exec();
    res.json('ok');
  } catch (err) {
    res.json(err);
  }
});

//delete
router.delete("/:description", verify, async (req, res) => {
  
  try {
    User.findByIdAndUpdate(req.user, { $pull: { data: req.params.description } }).exec();
    res.json('ok');
  } catch (err) {
    res.json(err);
  }
});

//get specific item
router.get("/:description", async (req, res) => {
  try {
    const item = await Item.find({ description: req.params.description });
    res.json(item);
  } catch (err) {
    res.json(err);
  }
});


//update
router.patch("/:description", async (req, res) => {
  try {
    const updatedItem = await Item.updateOne(
      { description: req.params.description },
      { $set: { description: req.body.description } }
    );
    res.json(updatedItem);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
