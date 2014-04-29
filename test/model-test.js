var should = require('should'),
  config = require('config'),
  koopserver = require('koop-server')(config); 

global.config = config;

var id = 'id';

before(function (done) {
  global['Sample'] = require('../models/Sample.js');
  done();
});

describe('Sample Model', function(){

    describe('when finding a data', function(){
      before(function(done ){
        // connect the cache
        Cache.db = PostGIS.connect( config.db.postgis.conn );
        done();
      });

      afterEach(function(done){
        done();
      });
    
      it('should find and return the data', function(done){
        Sample.find(id, {}, function(err, data){
          should.not.exist(err);
          should.exist(data);
          done();
        });
      });

    });

});

