var test = require('tape')
var koop = require('koop/lib')
var sinon = require('sinon')
var Model = require('../models/Sample')
var sample

koop.Cache = new koop.DataCache(koop)
koop.Cache.db = koop.LocalDB
koop.log = new koop.Logger({ logfile: 'test_log' })
sample = new Model(koop)

test('setup', function (t) {
  sinon.stub(sample, 'request', function (url, callback) {
    return callback(null, null, "{type: 'FeatureCollection', features: []}")
  })
  t.end()
})

test('Sample find method', function (t) {
  sample.find(1, {}, function (err, data) {
    t.error(err, 'data returned without error')
    t.ok(data, 'data exists')
    t.equal(data.length, 1, 'data is an array')
    t.equal(data[0].type, 'FeatureCollection', 'data contains object of type FeatureCollection')
    t.end()
  })
})

test('teardown', function (t) {
  sample.request.restore()
  t.end()
})
