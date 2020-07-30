const router = require('express').Router();
const verify = require('../utils/verifyToken')
const User = require("../models/User");

router.post('/name', verify, async (req, res) => {

    try {
        User.findByIdAndUpdate(req.user, { $set: { name: req.body[1].newName } }).exec();
        res.json('ok');
      } catch (err) {
        res.json(err);
      }
});

module.exports = router;