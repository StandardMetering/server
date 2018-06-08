let express = require( 'express' );
let router = express.Router();

/* GET users listing. */
router.get( '/', function ( req, res ) {
  res.send( JSON.stringify( { accepted: true, error: null, data: true } ) );
} );

module.exports = router;
