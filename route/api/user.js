let express = require( 'express' );
let router = express.Router();
let userModel = require( '../../model/user' );
let respondToRequest = require( '../util/respondToRequest' );

router.get( '/info', function ( req, res ) {
  
  respondToRequest.withNetworkObject( req, res, "user", res.locals.userNetworkObject );

} );

router.post( '/', function ( req, res, next ) {

  userModel.createNewUserRequestFromGoogleAccessToken( res.locals.googleAccessToken, function( error, data ) {

    if ( error ) {
      next( error );
      return;
    }

    respondToRequest.withNetworkObject( req, res, data );
  } );
} );

module.exports = router;
