/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: http://koopjs.github.io/docs/specs/provider/
*/
const request = require('request').defaults({gzip: true, json: true})
const config = require('config')

const base = 'https://raw.github.com'
const hardboiled = 'https://raw.github.com/chelm/grunt-geo/master/samples/Leaflet.geojson'

function Model (koop) {}

Model.prototype.getData = function (req, callback) {

  const key = config.github.key || process.env.KOOP_GITHUB_TOKEN || null

  // not sure if using hosts like this is kosher
  const user = req.params.host
  const repo = req.params.id

  const full = base + '/' + user + '/' + repo + '/' + 'master/samples/Leaflet.geojson'

  // how to expose more url parameters?  ie: folder+file, branch
  // console.log(req.params)

  // not sending github token in request (yet)
  request(hardboiled, (err, res, body) => {
    if (err) return callback(err)
    // translate the response into geojson
    const geojson = translate(body)

    // Cache data for 10 seconds at a time by setting the ttl or "Time to Live"
    geojson.ttl = 10
    // hand off the data to Koop
    callback(null, geojson)
  })
}

function translate (input) {
  // nothing to convert, we're already asking GitHub for GeoJSON
  return input
}

module.exports = Model