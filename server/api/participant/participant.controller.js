/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/participants              ->  index
 */

'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var Parse = require('parse/node').Parse;
var fs = require('fs');
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);


exports.addParticipant = function (req, res) {
  var Answer = Parse.Object.extend('Answer');
  var newAnswer = new Answer();

  newAnswer.save().then(function (result) {
      res.status(200).end();
    },
    function (err) {
      console.log(err);
      res.status(500).end();
    });
};

exports.addAnswer = function(req, res) {
  var answers = req.body.answers;
  var objectId = req.body.objectId;

  var Answer = Parse.Object.extend('Answer');
  var newAnswer = new Answer();
  newAnswer.id = objectId;
  newAnswer.set('answers', answers);
  newAnswer.set('numAliens', answers.length);

  newAnswer.save().then(function (result) {
      res.status(200).end();
    },
    function (err) {
      console.log(err);
      res.status(500).end();
    });
};

exports.getAnswers = function (req, res) {
  var Answer = Parse.Object.extend('Answer');
  var Answer = new Parse.Query(Answer);

  query.descending('numAliens');
  query.find({
    success: function (results) {
      res.json(results);
    }
    ,
    error: function (error) {
      console.log(error);
      res.status(500).end();
    }
  });
};


