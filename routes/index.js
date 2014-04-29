// Defines the routes and params name that will be passed in req.params 
module.exports = {
  
  'get /sample/': {
    controller: 'sample',
    action: 'index'
  },

  'get /sample': {
    controller: 'sample',
    action: 'index'
  },

  'get /sample/:id.:format': {
    controller: 'sample',
    action: 'getRepo'
  },

  'get /sample/:id': {
    controller: 'sample',
    action: 'getRepo'
  },

  'get /sample/:id/preview': {
    controller: 'sample',
    action: 'preview'
  },

  'get /sample/:id/FeatureServer': {
    controller: 'sample',
    action: 'featureservice'
  },

  'get /sample/:id/FeatureServer/:layer': {
    controller: 'sample',
    action: 'featureservice'
  },

  'get /sample/:id/FeatureServer/:layer/:method': {
    controller: 'sample',
    action: 'featureservice'
  },

  'get /sample/:id/thumbnail' : {
    controller  : 'sample',
    action: 'thumbnail'
  },

  'get /sample/:id/tiles/:z/:x/:y.:format': { 
    controller : 'sample',
    action: 'tiles'
  }

}
