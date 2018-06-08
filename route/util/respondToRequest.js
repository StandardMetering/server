module.exports.withNetworkObject = function( req, res, networkDataObject ) {

  let networkObject = {
    accepted: true,
    error: null,
    data: networkDataObject
  };

  res.setHeader('content-type', 'application/json');
  res.end( JSON.stringify( networkObject ) );

};

module.exports.withError = function( req, res, error ) {

  let networkObject = {
    accepted: false,
    error: error,
    data: null
  };

  res.setHeader('content-type', 'application/json');
  res.end( JSON.stringify( networkObject ) );

};