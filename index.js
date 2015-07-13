// require package.json to get access to provider module info
var pkg = require('./package.json')

var provider = {
  // Used by koop to help build default routes for FeatureService and preview.
  // required
  name: 'Sample',

  // Flags the provider as supporting registered hosts.
  // Set this to true if the provider can point to more than one instance.
  // optional, defaults to false
  hosts: true,

  // Used to build default routes
  // a pattern is essentially the default route pattern for the provider
  // optional
  pattern: '/:id',

  // required
  controller: require('./controller'),

  // required
  routes: require('./routes'),

  // required
  model: require('./models/Sample'),

  // used to share information about the provider with the koop server
  status: {
    // version of this provider (should be same as version in package.json)
    version: pkg.version
  }
}

// export the provider so koop has access to it
module.exports = provider
