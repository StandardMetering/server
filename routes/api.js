let express = require( 'express' );
let router = express.Router();

// Routers
let usersRouter = require( './api/user' );

router.use( '/user', usersRouter );

module.exports = router;