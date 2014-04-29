var should = require('should'),
  request = require('supertest'),
  config = require('config'),
  koop = require('koop-server')(config);

global.config = config;

before(function (done) {
    Cache.db = PostGIS.connect( config.db.postgis.conn );
    try { koop.register(require("../index.js")); } catch(e){}
    done(); 
});

describe('Koop Routes', function(){

    describe('/sample', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/sample')
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
      });
    });

});

