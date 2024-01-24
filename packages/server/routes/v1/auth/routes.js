var express = require('express');
var router = express.Router();

const ct = require('./controller')

router.post(
    '/', 
    ct.login
)

module.exports = router;
