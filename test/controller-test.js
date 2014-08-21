var should = require('should'),
  sinon = require('sinon'),
  config = require('config'),
  request = require('supertest'),
  // we require Koop so we can fake having an actual server running 
  koop = require('koop-server')(config);

  // we need koop/lib so we can have access to shared code not exposed directly off the koop object
  kooplib = require('koop-server/lib');

var sample;

before(function(done){
  // pull in the provider module
  var provider = require('../index.js');

  // create the model
  sample = new provider.model( kooplib );

  // pass the model to the controller 
  var controller = new provider.controller( sample );

  // bind the default routes so we can test that those work
  koop._bindDefaultRoutes( provider.name, provider.pattern, controller );

  // bind the routes into Koop 
  koop._bindRoutes( provider.routes, controller );
  done();
});

after(function(done){
  done();
});

describe('Sample Controller', function(){

    describe('get', function() {
      before(function(done ){

        // we stub the find method so we dont actually try to call it
        // we're not testing the model here, just that the controller should call the model 
        sinon.stub(sample, 'find', function(id, options, callback){
          callback(null, [{ 
            type:'FeatureCollection', 
            features: [{ properties: {}, coordinates: {}, type: 'Feature' }] 
          }]);
        });

        done();
      });

      after(function(done){
        // restore the stubbed methods so we can use them later if we need to
        sample.find.restore();
        done();
      });

      it('/sample/1 should call find', function(done){
        request(koop)
          .get('/sample/1')
          .end(function(err, res){
            res.status.should.equal(200);
            //sample.find.called.should.equal(true);
            done();
        }); 
      });
    });

    describe('index', function() {
      it('/sample should return 200', function(done){
        request(koop)
          .get('/sample')
          .end(function(err, res){
            res.status.should.equal(200);
            done();
        });
      });
    });

    describe('preview', function() {
      it('/sample/1/preview should return 200', function(done){
        request(koop)
          .get('/sample/1/preview')
          .end(function(err, res){
            res.status.should.equal(200);
            done();
        });
      });
    });

    describe('FeatureServer', function() {
      it('/sample/1/FeatureServer should return 200', function(done){
        request(koop)
          .get('/sample/1/FeatureServer')
          .end(function(err, res){
            res.status.should.equal(200);
            done();
        });
      });
    });

});
