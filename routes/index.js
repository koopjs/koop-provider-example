// Defines the routes and params name that will be passed in req.params
// routes tell Koop what controller method should handle what request route

module.exports = {
  'get /sample': 'index',
  'get /sample/:id': 'get',
  'get /sample/:id/preview': 'preview',
  'get /sample/:id/FeatureServer': 'featureserver'
}
