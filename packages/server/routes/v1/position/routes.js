var express = require('express');
var router = express.Router();

const ct = require('./controller')
const verifyJwt = require('../../../middlewares/jwt')

router.get(
    '/', 
    [ verifyJwt ], 
    ct.allPosition
)

router.post(
    '/', 
    [ verifyJwt ], 
    ct.createPosition
)

router.get(
    '/single',
    [ verifyJwt ], 
    ct.readSinglePosition
)

router.put(
    '/', 
    [ verifyJwt ], 
    ct.updatePosition
)

router.delete(
    '/', 
    [ verifyJwt ], 
    ct.deletePosition
)

module.exports = router;
