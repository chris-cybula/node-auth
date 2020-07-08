const router = require('express').Router();
const verify = require('../utils/verifyToken')

router.get('/', verify, (req, res) => {
    res.json({data: 'data'})
    // res.send(req.user);
});

module.exports = router;