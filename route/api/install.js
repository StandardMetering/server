let express = require( 'express' );
let router = express.Router();
let InstallModel = require( '../../model/install' );
let respondToRequest = require( '../util/respondToRequest' );
let modelUtil = require( '../../model/util' );
let routeRequires = require( '../../business/routeRequires' );

router.post( '/create', function ( req, res, next ) {

  let newInstall = req.body;

  InstallModel.createNewInstall(
    res.locals.userNetworkObject.google_id,
    newInstall,
    function ( error, data ) {

      if ( error ) {
        next( {
          code: error.code,
          message: error.errmsg || error.message,
          data: error.data
        } );
        return;
      }

      respondToRequest.withNetworkObject(
        req,
        res,
        "install",
        modelUtil.removeMongoDBFields( data )
      );

    } );

} );


router.post( '/', function( req, res, next ) {

  let newInstall = req.body;

  // TODO: only set if insert
  newInstall.creator = res.locals.userNetworkObject.google_id;

  console.log("New Install: " + JSON.stringify(req.body));

  InstallModel.upsert(
    res.locals.userNetworkObject.google_id,
    newInstall,
    function ( error, data ) {

      if ( error ) {
        next( {
          code: error.code,
          message: error.errmsg || error.message,
          data: error.data
        } );
        return;
      }

      respondToRequest.withNetworkObject(
        req,
        res,
        "install",
        modelUtil.removeMongoDBFields( data )
      );

    }
  )

} );


router.get( '/', function( req, res, next ) {

  InstallModel.findAllCreatedByUser(
    res.locals.userNetworkObject.google_id,
    function( err, data ) {

      if( err ) {
        next({
          code: respondToRequest.errorCodes.general,
          message: 'Error',
          data: err
        });
        return;
      }

      respondToRequest.withNetworkObject( req, res, "array_install", data );
    } );

} );

router.get( '/all', routeRequires.adminRights, function( req, res, next ) {

  let formatQuery = req.query.format;

  console.log( "Format: " + formatQuery );

  InstallModel.findAll( function( err, data ) {

    if( err ) {
      next( {
        code: respondToRequest.errorCodes.general,
        message: "Error",
        data: err
      } );
      return;
    }

    if( formatQuery ) {
      respondToRequest.withFormat( req, res, formatQuery, data );
      return;
    }

    respondToRequest.withNetworkObject( req, res, "array_install", data );

  } );

} );


router.get( '/:install_num', function(req, res, next) {

  let install_num_param = req.params.install_num;

  InstallModel.findByInstallNum( install_num_param, function( err, data ) {

    if( err ) {
      next( {
        code: respondToRequest.errorCodes.general,
        message: "Error",
        data: err
      } );
      return;
    }

    respondToRequest.withNetworkObject( req, res, "install", data );
  } );

});

module.exports = router;