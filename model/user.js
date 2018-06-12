let mongoose = require( 'mongoose' );

let UserSchema = mongoose.model( 'user', {

  google_id: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  display_name: {
    type: String,
    required: true
  },
  google_access_token: String,
  admin_rights: {
    type: Boolean,
    default: false
  },
  dev: {
    type: Boolean,
    default: false
  }

} );

let User = module.exports = mongoose.model( 'user' );

module.exports.createNewUserRequestFromGoogleAccessToken = function ( googleAccessToken, callback ) {

  // Todo: execute database create
  callback( {message: "Yea there's an error"}, {display_name:"Swag Monster", google_access_token: googleAccessToken} );
};

module.exports.getDatabaseObjectFromGoogleID = function ( userGoogleId, callback ) {
  console.log( "User google id: " + userGoogleId );
  User.findOne( { google_id: userGoogleId }, callback );
};

module.exports.getNetworkDataObjectFromDatabaseObject = function ( userDatabaseObject ) {
  
  if ( userDatabaseObject === null ) {
    console.log( "User Database object null" );
    return null
  }
  
  return {
    google_id: userDatabaseObject.google_id,
    display_name: userDatabaseObject.display_name,
    admin_rights: userDatabaseObject.admin_rights,
    dev: userDatabaseObject.dev,
    user_right: true
  }
};

module.exports.getNetworkDataObjectFromGoogleID = function ( userGoogleId, callback ) {
  module.exports.getDatabaseObjectFromGoogleID( userGoogleId, function ( error, data ) {

    if ( error ) {
      callback( error, null );
      return;
    }

    callback( null, module.exports.getNetworkDataObjectFromDatabaseObject( data ) );
  } );
};