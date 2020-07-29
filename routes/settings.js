const router = require('express').Router();
const verify = require('../utils/verifyToken')

router.post('/', verify, async (req, res) => {

    res.send('ok')

    console.log(req.body.id)
});

module.exports = router;