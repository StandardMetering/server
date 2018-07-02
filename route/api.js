let express = require( 'express' );
let router = express.Router();

// Routers

// Business Logic
let businessMiddleware = require( '../business/middleware' );

let usersRouter = require( './api/user' );
let installRouter = require( './api/install' );

router.use( businessMiddleware );
router.use( '/user', usersRouter );
router.use( '/install', installRouter );

module.exports = router;