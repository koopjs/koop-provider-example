var test = require('tape')
var kooplib = require('koop/lib')
var koop = require('koop')({})
var request = require('supertest')
var sinon = require('sinon')

var provider = require('../')
var Controller = require('../controller')
var Model = require('../models/Sample')

// create the model
var model = new Model(kooplib)

// pass the model to the controller
var controller = new Controller(model, kooplib.BaseController)

// bind the default routes so we can test that those work
if (provider.pattern) {
  koop._bindDefaultRoutes(provider.name, provider.pattern, controller)
}

// bind the routes into Koop
koop._bindRoutes(provider.routes, controller)

sinon.stub(model, 'find', function (id, options, callback) {
  callback(null, [{
    type: 'FeatureCollection',
    features: [{ properties: {}, coordinates: {}, type: 'Feature' }]
  }])
})

test('controller: index', function (t) {
  request(koop)
    .get('/sample')
    .end(function (err, res) {
      t.error(err, 'does not error')
      t.equal(res.status, 200, 'returns 200')
      t.end()
    })
})

test('controller: get', function (t) {
  request(koop)
    .get('/sample/1')
    .end(function (err, res) {
      t.error(err, 'does not error')
      t.equal(res.status, 200, 'returns 200')
      t.end()
    })
})

test('controller: preview', function (t) {
  request(koop)
    .get('/sample/1/preview')
    .end(function (err, res) {
      t.error(err, 'does not error')
      t.equal(res.status, 200, 'returns 200')
      t.end()
    })
})

test('controller: FeatureServer', function (t) {
  request(koop)
    .get('/sample/1/FeatureServer')
    .end(function (err, res) {
      t.error(err, 'does not error')
      t.equal(res.status, 200, 'returns 200')
      t.end()
    })
})
