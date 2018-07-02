let respondToRequest = require( '../util/respondToRequest' );

module.exports = generalErrorHandler;

function generalErrorHandler() {

  return function ( error, req, res, next ) {

    console.error( error );
    console.trace();

    // TODO: Make more sophisticated
    respondToRequest.withError( req, res, error );
  }
}