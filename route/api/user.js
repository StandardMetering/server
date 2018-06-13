let express = require( 'express' );
let router = express.Router();
let userModel = require( '../../model/user' );
let pendingUserModel = require( '../../model/pendingUser' );
let respondToRequest = require( '../util/respondToRequest' );

router.get( '/info', function ( req, res ) {
  
  respondToRequest.withNetworkObject( req, res, "user", res.locals.userNetworkObject );

} );

router.get( '/pending', function( req, res ) {

  pendingUserModel.getPendingUsers( function( error, data ) {

    if( error ) {
      next( error );
      return;
    }

    respondToRequest.withNetworkObject( req, res, "array_pending", data );
  } );

} );

router.post( '/', function ( req, res, next ) {

  let body = req.body;

  userModel.acceptPendingUser( body, function( error, data ) {

    if( error ) {
      next( error );
      return;
    }

    respondToRequest.withNetworkObject( req, res, "user", data )

  } );
} );

module.exports = router;
