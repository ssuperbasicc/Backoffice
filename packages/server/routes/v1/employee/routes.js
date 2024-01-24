var express = require('express');
var router = express.Router();

const ct = require('./controller')

router.get(
    '/', 
    ct.allEmployee
)

router.post(
    '/', 
    ct.createEmployee
)

router.get(
    '/single', 
    ct.readSingleEmployee
)

router.put(
    '/', 
    ct.updateEmployee
)

router.delete(
    '/', 
    ct.deleteEmployee
)

module.exports = router;
