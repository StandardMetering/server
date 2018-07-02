let respondToRequest = require( '../route/util/respondToRequest' );

module.exports.adminRights = function( req, res, next ) {

  if( !res.locals.userNetworkObject.admin_rights ) {
    next({
      code: respondToRequest.errorCodes.adminRightsRequired,
      message: "This request requires admin rights.",
      data: null
    });
    return;
  }

  next();
};