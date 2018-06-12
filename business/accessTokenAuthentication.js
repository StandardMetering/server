let WEB_CLIENT_ID = "438678561117-b8d1tn6ftgjio5751dmo79olp1q86e56.apps.googleusercontent.com";
let IOS_CLIENT_ID = "438678561117-1ve98ie1ob3ogvmcr8dqtt8ke66boc3c.apps.googleusercontent.com";
const { OAuth2Client } = require( 'google-auth-library' );
const client = new OAuth2Client( WEB_CLIENT_ID );
let respondToRequest = require( '../route/util/respondToRequest' );

module.exports = accessTokenAuthentication;

function accessTokenAuthentication() {
  
  return function ( req, res, next ) {
    
    // Get header
    let headers = req.headers;
    var token;
    
    // Try to get access token
    if ( headers && headers.authorization ) {
      token = headers.authorization.split( " " )[ 1 ];
    } else {
      
      next( {
        code: respondToRequest.errorCodes.tokenRequired,
        message: "Google access token required",
        data: null
      } );
      return;
    }
    
    console.log( "Token: " );
    console.log( token );
    res.locals.googleAccessToken = token;
    
    // Have google verify access token
    async function verify() {
      
      // Get Google ticket info
      const ticket = await client.verifyIdToken( {
        idToken: token,
        audience: [ WEB_CLIENT_ID, IOS_CLIENT_ID ]
      } );
      
      console.log( "User: " + ticket.getPayload().email );
      res.locals.userNetworkObject = {
        google_id: ticket.getPayload().sub,
        display_name: ticket.getPayload().email,
        google_access_token: token,
        admin_rights: false,
        user_rights: false,
        dev: false
      };
      
    } // Verify function
    
    // Call verify Function
    verify()
      .then( function () {
        next();
      } )
      // If verify promise rejected
      .catch( function ( error ) {
        
        // Log error
        console.log( error );

        // Check for exp error
        if ( error.message.includes( "Token used too late" ) ) {
          next( {
            code: respondToRequest.errorCodes.tokenExpired,
            message: "Token expired",
            data: token
          } );
          return;
        }

        next( {
          code: respondToRequest.errorCodes.tokenGeneral,
          message: "Unable to authenticate user",
          data: token
        } );
      } ); // verify.catch()
  }; // resulting middleware function
} // accessTokenAuthentication