let UserModel = require( '../model/user' );
let pendingUser = require( '../model/pendingUser' );
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
        console.log( "Adding user to pending user collection." );

        // Add user to pending user collection
        pendingUser.upsert(
          res.locals.userNetworkObject.google_id,
          res.locals.googleTokenPayload.email,
          function( error ) {

            // Check for error in upsert
            if ( error ) {
              next( error )
            }

            // Indicate actions
            next({
              code: respondToRequest.errorCodes.tokenDoesNotMatchAnyUser,
              message: "Not a Standard Metering user. A request to become a member has been posted.",
              error_data: null
            });
          }
        );
        return;
      }

      // Set local user object to result
      res.locals.userNetworkObject = data;
      next()
    } );
  } // anonymous middleware function
} // googleUserVerification