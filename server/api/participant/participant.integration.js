'use strict';

var app = require('../..');
var request = require('supertest');

describe('Participant API:', function() {

  describe('GET /api/participants', function() {
    var participants;

    beforeEach(function(done) {
      request(app)
        .get('/api/participants')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          participants = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      participants.should.be.instanceOf(Array);
    });

  });

});
