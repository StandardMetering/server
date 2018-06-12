let express = require( 'express' );
let router = express.Router();
let accessTokenAuthentication = require( './accessTokenAuthentication' );
let googleUserVerification = require( './googleUserVerification' );

// Routers
router.use( accessTokenAuthentication() );
router.use( googleUserVerification() );

module.exports = router;