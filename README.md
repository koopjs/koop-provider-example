# Sample provider for Koop

This repo is meant to act as a simple starting point for developing new providers for Koop.

## What's a Provider?

A Koop provider is a plugin for Koop that wraps any API or source of data so that it can be used within the Koop's codebase. Koop doesn't come with any providers out of the box, which keeps it lightweight.

Providers all follow a standard structure that closely resembles that of most MVC frameworks. A provider consists of `routes`, a `controller`, a `model`, and `views` (each explained in more detail below). The basic gist is that each provider is "registered" when the server starts. The provider's routes are bound into the Koop server. Each route maps to a specific `controller` and each controller is passed the providers `model`. Each `model` is designed to have access to the core code in Koop which gives it access to centralized things like a Cache (db) and shared code for doing like creating FeatureServices.

## Koop Architecture

Koop consists of the core [koop](http://github.com/koopjs/koop) module used in combination with [providers](http://koopjs.github.io/docs/providers), a [cache](http://koopjs.github.io/docs/caches), and optional [plugins](http://koopjs.github.io/docs/plugins). Koop acts as Express middleware and can register providers to set up routes for interacting with data from other sources. [Read the documentation](http://koopjs.github.io) to find out more about Koop's architecture.

### `index.js`

The file `index.js` describes the provider. It sets a "pattern" for the provider to use in its routing (Koop tries to build some routes by default like ones for FeatureServices), and it includes the routes, controller, and model for the provider. This file tells koop everything it needs to know about the provider.

### Routes

Routes tell koop what methods in the controller should respond to what requests.

### Controller

Controllers handle formatting request parameters and query strings, passing requests to Models, and responding to requests with data from Models.

### Models

Models do the dirty work. They call APIs or query databases and then interact with Koop's cache and other code to help with processing of data from external sources. The primary thing a model should do is extract external data, in any format, and tranform it into GeoJSON. The GeoJSON provided by a model is used in the rest of Koop as the standard data transport format.

### Views

Since JSON is the primary output of Koop, views are not really used, but they can be. Views expose HTML templates that could be used to help interact with a provider.

## Getting Started

```
git clone git@github.com:koopjs/koop-sample-provider.git
cd koop-sample-provider && rm -rf .git
npm install
# edit the index.js file
# edit the files in test/ (for TDD)
# edit routes/index.js
# edit controller/index.js
# rename and edit models/Sample.js
```

### Using a provider in Koop

The best way to add a provider to a Koop project is by publishing it on npm, then installing it via the terminal command `npm install provider-name --save`. We recommend using [`npm link`](https://docs.npmjs.com/cli/link) to develop and test locally before you're ready to publish your provider module.

