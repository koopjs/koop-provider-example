var BaseController = require('koop-server/lib/Controller.js');

var Controller = function( Sample ){

  this.index = function(req, res){
    res.send('This is a sample provider');
  };

  this.get = function(req, res){
    Sample.find(req.params.id, req.query, function(err, data){
      if (err){
        res.send(err, 500);
      } else {
        res.json( data );
      }
    });
  };

  this.featureserver = function(req, res){
    var callback = req.query.callback, self = this;
    delete req.query.callback;

    Sample.find(req.params.id, req.query, function(err, data){
      if (err) {
        res.send(err, 500);
      } else {
        // we remove the geometry if the "find" method already handles geo selection in the cache
        delete req.query.geometry;
        BaseController._processFeatureServer( req, res, err, data, callback);
      }
    });
  };

  this.preview = function(req, res){
    res.render(__dirname + '/../views/demo', { locals:{ id: req.params.id } });
  }
  
  return this;

};

module.exports = Controller;

