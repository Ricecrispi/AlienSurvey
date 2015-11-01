'use strict';

var app = require('../..');
var request = require('supertest');

describe('Question API:', function() {

  describe('GET /api/questions', function() {
    var questions;

    beforeEach(function(done) {
      request(app)
        .get('/api/questions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          questions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      questions.should.be.instanceOf(Array);
    });

  });

});
