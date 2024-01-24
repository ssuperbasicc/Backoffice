var express = require('express');
var router = express.Router();

const ct = require('./controller')
const verifyJwt = require('../../../middlewares/jwt')

router.get(
    '/', 
    [ verifyJwt ],
    ct.allEmployee
)

router.post(
    '/', 
    [ verifyJwt ],
    ct.createEmployee
)

router.get(
    '/single', 
    [ verifyJwt ],
    ct.readSingleEmployee
)

router.put(
    '/', 
    [ verifyJwt ],
    ct.updateEmployee
)

router.delete(
    '/', 
    [ verifyJwt ],
    ct.deleteEmployee
)

module.exports = router;
