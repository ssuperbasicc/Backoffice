var express = require('express');
var router = express.Router();

const ct = require('./controller')

router.get(
    '/', 
    ct.allPosition
)

router.post(
    '/', 
    ct.createPosition
)

router.get(
    '/single',
    ct.readSinglePosition
)

router.put(
    '/', 
    ct.updatePosition
)

router.delete(
    '/', 
    ct.deletePosition
)

module.exports = router;
