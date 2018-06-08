
module.exports = accessTokenAuthentication;

function accessTokenAuthentication() {

  return function ( req, res, next ) {

    // TODO: Get user bearer token
    let bearerToken = "Google.Access.Token";
    res.locals.googleAccessToken = bearerToken;

    // TODO: Authenticate google access token attatched to request
    res.locals.userNetworkObject = true;

    next();
  };
}