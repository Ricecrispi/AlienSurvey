'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var questionCtrlStub = {
  index: 'questionCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var questionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './question.controller': questionCtrlStub
});

describe('Question API Router:', function() {

  it('should return an express router instance', function() {
    questionIndex.should.equal(routerStub);
  });

  describe('GET /api/questions', function() {

    it('should route to question.controller.index', function() {
      routerStub.get
        .withArgs('/', 'questionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
