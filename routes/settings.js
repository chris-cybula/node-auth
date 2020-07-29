const router = require('express').Router();
const verify = require('../utils/verifyToken')

router.post('/', verify, async (req, res) => {

    res.send('ok')
});

module.exports = router;