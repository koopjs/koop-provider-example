var extend = require('node.extend'),
  crypto = require('crypto'),
  fs = require('fs');

// inherit from base controller (global via koop-server)
var Controller = extend( {}, BaseController );

// general helper for not found repos
Controller.notFound = function(req, res){
  res.send('A useful error for missing data', 404);
};


// general helper for error'd requests
Controller.Error = function(req, res){
  res.send('Another useful error', 500);
};


// 
Controller.get = function(req, res){
    var key = ['sample'];
    Sample.find(req.params.id, req.query, function(err, data){
      if (err){
        res.send(err, 500);
      } else {
        res.json( data );
      }
    });
};

Controller.featureservice = function(req, res){
    var callback = req.query.callback, self = this;
    delete req.query.callback;

    Sample.find(req.params.id, req.query, function(err, data){
      if (err) {
        res.send(err, 500);
      } else {
        delete req.query.geometry;
        Controller._processFeatureServer( req, res, err, data, callback);
      }
    });
};

Controller.tiles = function( req, res ){
    var callback = req.query.callback;
    delete req.query.callback;
    
    var key,
      layer = req.params.layer || 0;

    var _send = function( err, data ){
        req.params.key = key + ':' + layer;
        if (req.query.style){
          req.params.style = req.query.style;
        }
        Tiles.get( req.params, data[ layer ], function(err, tile){
          if ( req.params.format == 'png'){
            //res.contentType('image/png');
            res.sendfile( tile );
          } else {
            if ( callback ){
              res.send( callback + '(' + JSON.stringify( tile ) + ')' );
            } else {
              res.json( tile );
            }
          }
        });
    }

    // build the geometry from z,x,y
    var bounds = merc.bbox( req.params.x, req.params.y, req.params.z );

    req.query.geometry = {
        xmin: bounds[0],
        ymin: bounds[1],
        xmax: bounds[2],
        ymax: bounds[3],
        spatialReference: { wkid: 4326 }
    };

    var _sendImmediate = function( file ){
      if ( req.params.format == 'png'){
        res.sendfile( file );
      } else {
        fs.readFile(file, function(err, data){
          if ( callback ){
            res.send( callback + '(' + data + ')' );
          } else {
            res.json( JSON.parse( data ) );
          }
        })
      }
    };

    Sample.find(req.params.id, req.query, function(err, data){
      if (err) {
        res.send(err, 500);
      } else {
        delete req.query.geometry;
        Controller._processFeatureServer( req, res, err, data, callback);
      }

      key = ['sample', req.params.id].join(':');
      var file = config.data_dir + 'tiles/';
        file += key + ':' + layer + '/' + req.params.format;
        file += '/' + req.params.z + '/' + req.params.x + '/' + req.params.y + '.' + req.params.format;
      
      if ( !fs.existsSync( file ) ) {
        Sample.find(req.params.id, req.query, _send );
      } else {
        _sendImmediate(file);
      }
    });

};


module.exports = Controller;

