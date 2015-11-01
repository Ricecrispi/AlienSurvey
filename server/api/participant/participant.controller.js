/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/participants              ->  index
 */

'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var Parse = require('parse').Parse;
var fs = require('fs');
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);


exports.addAnswer = function(req, res) {
  var answers = req.body.answers;

  var Answer = Parse.Object.extend('Answer');
  var newAnswer = new Answer();

  newAnswer.set('answers', answers);

  newAnswer.save().then(function (result) {
      res.status(200).end();
    },
    function (err) {
      console.log(err);
      res.status(500).end();
    }
  );

};

