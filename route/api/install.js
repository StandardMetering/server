let express = require( 'express' );
let router = express.Router();
let installModel = require( '../../model/install' );
let respondToRequest = require( '../util/respondToRequest' );
let modelUtil = require( '../../model/util' );

router.post( '/create', function ( req, res, next ) {

  let newInstall = {
    install_num: req.body.install_num
  };

  installModel.createNewIntstall(
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
        "install_new",
        modelUtil.removeMongoDBFields( data )
      );

    } );

} );

module.exports = router;