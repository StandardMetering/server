let CLIENT_ID = "438678561117-b8d1tn6ftgjio5751dmo79olp1q86e56.apps.googleusercontent.com";
let IOS_CLIENT_ID = "438678561117-1ve98ie1ob3ogvmcr8dqtt8ke66boc3c.apps.googleusercontent.com";
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

module.exports = accessTokenAuthentication;

function accessTokenAuthentication() {

  return function ( req, res, next ) {
  
    // Get header
    let headers = req.headers;
    var token;
  
    // Try to get access token
    if (headers && headers.authorization) {
      token = headers.authorization.split(" ")[1];
    } else {
    
      // Send 401 if no access token
      let response = {
        isValidGoogleUser: false,
        message: "Provide an access token to access this resource."
      };
      let strResponse = JSON.stringify(response);
    
      console.log("Sending response: " + strResponse);
    
      res.status(401).end(strResponse);
      return;
    }
  
    console.log( "Token: " );
    console.log( token );
    res.locals.googleAccessToken = token;
  
    // Have google verify access token
    async function verify() {
    
      // Get Google ticket info
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: [CLIENT_ID, IOS_CLIENT_ID]
      });
  
      // TODO: Check database
      res.locals.userNetworkObject = {
        google_id: ticket.getPayload().sub,
        display_name: ticket.getPayload().email,
        google_access_token: token,
        admin_rights: true,
        dev: true
      };
    
    } // Verify function
  
    // Call verify Function
    verify()
      .then( function() {
        next();
      })
    // If verify promise rejected
      .catch(function (error) {
      
        // Log error
        console.log( error );
      
        // Indicate invalid google access token
        var response = {
          isValidGoogleUser: false
        };
      
      
        if( error.message.includes("Token used too late") ) {
          response = {
            tokenTimeout: true
          }
        }
      
        let strResponse = JSON.stringify(response);
        console.log("Sending response: " + strResponse);
      
        // Send 401
        res.status(401).end(strResponse);
      });
  };
}