var express = require('express');
var router = express.Router();

const ct = require('./controller')
const verifyJwt = require('../../../middlewares/jwt')

router.get(
    '/', 
    [ verifyJwt ],
    ct.allWorkUnit
)

router.post(
    '/', 
    [ verifyJwt ],
    ct.createWorkUnit
)

router.get(
    '/single',
    [ verifyJwt ],
    ct.readSingleWorkUnit
)

router.put(
    '/',
    [ verifyJwt ],
    ct.updateWorkUnit
)

router.delete(
    '/',
    [ verifyJwt ],
    ct.deleteWorkUnit
)


module.exports = router;
