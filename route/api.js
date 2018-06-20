let express = require( 'express' );
let router = express.Router();

// Routers
let usersRouter = require( './api/user' );
let installRouter = require( './api/install' );

router.use( '/user', usersRouter );
router.use( '/install', installRouter );

module.exports = router;