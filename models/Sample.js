var request = require('request')

var Sample = function (koop) {
  var sample = new koop.BaseModel(koop)

  /**
   * Wrap the request module for easy testing
   * issues a get request to given URL
   *
   * @param {string} url - a url to a resource
   * @param {function} callback
   */
  sample.request = function (url, callback) {
    request.get(url, callback)
  }

  /**
   * Find a resource, typically JSON, within an external API or Database
   *
   * @param {string} id - an id used to reference the remote resource
   * @param {object} options - any optional params needed for the request
   * @param {function} callback
   */
  sample.find = function (id, options, callback) {
    var type = 'Sample'

    // check the cache for data with this type & id
    koop.Cache.get(type, id, options, function (err, entry) {
      if (err) {
        // if we get an err then get the data and insert it
        var url = 'http://...' + id // <-- change this to point to a real URL

        sample.request(url, function (err, res) {
          if (err) return callback(err)

          // var json = JSON.parse(res.body)
          // do something; turn json into GeoJSON
          // fake some geojson data for the sake of example
          var geojson = [{
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              properties: {
                prop1: true
              },
              geometry: {
                type: 'Point',
                coordinates: [0, 0]
              }
            }]
          }]

          // insert data into the cache; assume layer is 0 unless there are many layers (most cases 0 is fine)
          koop.Cache.insert(type, id, geojson, 0, function (err, success) {
            if (err) return callback(err)
            if (success) callback(null, geojson)
          })
        })
      } else {
        callback(null, entry)
      }
    })
  }

  return sample
}

module.exports = Sample
