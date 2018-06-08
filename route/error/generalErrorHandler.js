let respondToRequest = require( '../util/respondToRequest' );

module.exports = generalErrorHandler;

function generalErrorHandler() {

  return function ( error, req, res, next ) {

    console.error( error );

    // TODO: Make more sophisticated
    respondToRequest.withError( req, res, error );
  }
}