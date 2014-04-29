var request = require('request');

exports.find = function( id, options, callback ){

  var type = 'Sample';
  
  // check the cache for data with this type & id 
  Cache.get( type, id, options, function(err, entry ){
    if ( err){
      // if we get an err then get the data and insert it 
      var url = 'http://...'+id; // <-- change this 

      request.get(url, function(e, res){
        var json = JSON.parse(res.body);
        // do something; turn it into GeoJSON

        // insert data   
        Cache.insert( type, id, json, 0, function( err, success){
          if ( success ) {
            callback( null, json );
          }
        });
      });
    } else {
      callback( null, entry );
    }
  });
};
