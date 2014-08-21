# koop-sample-provider 

## A sample provider for Koop 

This repo is meant to act as a simple starting point for developing new providers for Koop.

------------

### What's a "provider"

A Koop provider is a sort of plugin to Koop that wraps any API or source of data so that it can be used within the Koop's codebase. Koop doesn't come with any providers out of the box which is nice from the stand point of development (keeping it all seperate means Koop remains light), but present a few challenges to things like deploying Koop and understanding how all the bits and peices work.  

Providers all follow a standard structure that closely resembles that of most MVC frameworks. A provider consists of `routes`, `controllers`, `models` and `views` (each explained in more detail below). The basic gist is that each provider is "registered" into Koop at the time the server is started. The provider's routes are bound into the Koop server. Each route maps to a specific `controller` and each controller is passed the providers `model`. Each `model` is designed to have to access to the core code in Koop which gives it access to centralized things like a Cache (db) and shared code for doing like creating FeatureServices.

### Koop Architecture

Koop is split up into two core repos: [https://github.com/Esri/koop](https://github.com/Esri/koop) and [https://github.com/Esri/koop-server](https://github.com/Esri/koop-server). Both of these are built on top of the Express framework and follow its middleware pattern. The primary [Koop](https://github.com/Esri/koop) repo is a very simple shell. 

### index.js 

The file `index.js` describes the provider. It sets a "pattern" for the provider to use in its routing (Koop tries to build some routes by default like ones for FeatureServices), and it includes the routes, controller, and model for the provider. This file tells koop everything it needs to know about the provider.

### Routes 

Routes tell koop what methods in the controller should respond to what requests.

### Controller

Controllers handle formatting request params and query strings, passing requests to Models, and responding to requests with data from Models. 

### Models

Models do the dirty work. They call APIs or query databases and then interact with Koop optional cache and other code to help with processing of data from external sources. The primary thing a Model should do is convert external data, in any format, into GeoJSON. The generated GeoJSON from Models is used in the rest of Koop as the standard format form which everything is based.  

### Views 

Since JSON is the primary output of Koop views are not really used, but they can be. Views expose HTML templates that could be used to help interact with a provider. 

### Getting Started 

  ```
    git clone git@github.com:chelm/koop-sample-provider.git
    cd koop-sample-provider && rm -rf .git
    npm install
    # edit the index.js file
    # edit the files in test/ (for TDD)
    # edit the routes/index.js
    # edit the controller/index.js 
    # edit the models/Sample.js 
  ``` 


### Using a provider in Koop 

Typically a provider would be installed within Koop via `npm install`. You can either publish your provider to NPM or use NPM to install the provider directly from a tarball from a github repo (or anywhere). 

