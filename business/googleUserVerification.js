let UserModel = require( '../model/user' );
let respondToRequest = require( '../route/util/respondToRequest' );

module.exports = googleUserVerification;

function googleUserVerification() {

  return function( req, res, next ) {
  
    UserModel.getNetworkDataObjectFromGoogleID( res.locals.userNetworkObject.google_id, (error, data) => {
    
      if( error ) {
        next( error );
        return;
      }
  
      if ( data === null ) {
        console.log( "Data null" );
        next({
          code: respondToRequest.errorCodes.tokenDoesNotMatchAnyUser,
          message: "Current Google user is not a Standard Metering user.",
          error_data: null
        });
        return;
      }
      
      res.locals.userNetworkObject = data;
      next()
    } );
  
  }
}