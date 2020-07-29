const router = require('express').Router();
const verify = require('../utils/verifyToken')
const User = require("../models/User");

router.post('/', verify, async (req, res) => {

    const user = await User.find( { _id: "5f1977073a4ad5235d16cdd7" })
    if (!user) return res.status(400).send("User doesn't exist");

    res.send(user)

    console.log(req.body)
});

module.exports = router;