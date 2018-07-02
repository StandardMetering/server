let respondToRequest = require( '../util/respondToRequest' );

module.exports = generalErrorHandler;

function generalErrorHandler() {

  return function ( error, req, res, next ) {

    // Log if server error
    if ( error.code >= respondToRequest.errorCodes.serverGeneral && error.code <= respondToRequest.errorCodes.serverEnd ) {
      console.error( error );
      console.trace();
    }

    // TODO: Make more sophisticated
    respondToRequest.withError( req, res, error );
  }
}