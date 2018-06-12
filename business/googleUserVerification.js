let UserModel = require( '../model/user' );
let respondToRequest = require( '../route/util/respondToRequest' );

module.exports = googleUserVerification;

function googleUserVerification() {

  return function( req, res, next ) {

    // Database call
    UserModel.getNetworkDataObjectFromGoogleID( res.locals.userNetworkObject.google_id, (error, data) => {

      // Pass any db error to error handler
      if( error ) {
        next( error );
        return;
      }

      // If no data
      if ( data === null ) {
        console.log( "No db entry matching " + res.locals.userNetworkObject.google_id );
        next({
          code: respondToRequest.errorCodes.tokenDoesNotMatchAnyUser,
          message: "Current Google user is not a Standard Metering user.",
          error_data: null
        });
        return;
      }

      // Set local user object to result
      res.locals.userNetworkObject = data;
      next()
    } );
  } // anonymous middleware function
} // googleUserVerification