'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var participantCtrlStub = {
  index: 'participantCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var participantIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './participant.controller': participantCtrlStub
});

describe('Participant API Router:', function() {

  it('should return an express router instance', function() {
    participantIndex.should.equal(routerStub);
  });

  describe('GET /api/participants', function() {

    it('should route to participant.controller.index', function() {
      routerStub.get
        .withArgs('/', 'participantCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
