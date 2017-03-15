/*
  index.js

  This file is required. It's role is to specify configuration settings.

  Documentation: http://koopjs.github.io/docs/specs/provider/
*/

const provider = {
  type: 'provider',
  name: 'github',
  hosts: true,
  disableIdParam: false,
  Controller: require('./controller'),
  Model: require('./model'),
  routes: require('./routes'),
  version: require('./package.json').version
}

module.exports = provider
