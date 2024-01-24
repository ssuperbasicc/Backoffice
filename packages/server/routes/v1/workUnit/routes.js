var express = require('express');
var router = express.Router();

const ct = require('./controller')

router.get(
    '/', 
    ct.allWorkUnit
)

router.post(
    '/', 
    ct.createWorkUnit
)

router.get(
    '/single',
    ct.readSingleWorkUnit
)

router.put(
    '/',
    ct.updateWorkUnit
)

router.delete(
    '/',
    ct.deleteWorkUnit
)


module.exports = router;
