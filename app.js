let createError = require( 'http-errors' );
let express = require( 'express' );
let path = require( 'path' );
let cookieParser = require( 'cookie-parser' );
let logger = require( 'morgan' );
let mongoose = require( 'mongoose' );

let app = express();

// Business Logic
let businessMiddleware = require( './business/middleware' );

// Routers
let indexRouter = require( './route/index' );
let apiRouter = require( './route/api' );

// Error Handlers
let generalErrorHandler = require( './route/error/generalErrorHandler' );

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'pug' );

// Middleware
app.use( logger( 'combined' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( businessMiddleware );

// Connect to the database
mongoose.connect( 'mongodb://localhost/standard_metering_db' ).then( () => {

  console.log( 'Connected to database.' );

} ).catch( ( reason ) => {

  console.error( "Could not connect to database.\n", reason );

} );

app.use( '/', indexRouter );
app.use( '/api', apiRouter );

app.use( generalErrorHandler() );

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
  next( createError( 404 ) );
} );

// error handler
app.use( function ( err, req, res, next ) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

  // render the error page
  res.status( err.status || 500 );
  res.render( 'error' );
} );

module.exports = app;
