var test = require('tape')
var koop = require('koop/lib')
var sinon = require('sinon')
var Model = require('../models/Sample')
var sample

// koop.Cache = new koop.DataCache(koop)
// koop.Cache.db = koop.LocalDB
sample = new Model(koop)

test('model: setup', function (t) {
  sinon.stub(sample, 'request', function (url, callback) {
    return callback(null, [{type: 'FeatureCollection', features: []}])
  })
  t.end()
})

test('model: find', function (t) {
  sample.find(1, {}, function (err, data) {
    t.error(err, 'data returned without error')
    t.ok(data, 'data exists')
    t.ok(Array.isArray(data), 'data is an array')
    t.equal(data[0].type, 'FeatureCollection', 'data contains object of type FeatureCollection')
    t.end()
  })
})

test('model: teardown', function (t) {
  sample.request.restore()
  t.end()
})
