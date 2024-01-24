var express = require('express');
var router = express.Router();

const ct = require('./controller')
const verifyJwt = require('../../../middlewares/jwt')

router.get(
    '/', 
    [ verifyJwt ],
    ct.metadata
)

router.get(
    '/top-login',
    [ verifyJwt ],
    ct.topTenLogin
)

router.get(
    '/filter-employee',
    [ verifyJwt ],
    ct.filterEmployee
)

router.get(
    '/filter-auth',
    [ verifyJwt ],
    ct.filterAuth
)

module.exports = router;
