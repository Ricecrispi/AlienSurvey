'use strict';

var express = require('express');
var controller = require('./participant.controller');

var router = express.Router();

router.post('/', controller.addAnswer);


module.exports = router;
