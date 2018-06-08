let express = require( 'express' );
let router = express.Router();
let accessTokenAuthentication = require( './accessTokenAuthentication' );

// Routers
router.use( accessTokenAuthentication() );

module.exports = router;