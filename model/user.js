let mongoose = require( 'mongoose' );
let pendingUser = require( './pendingUser' );

let UserSchema = mongoose.Schema( {

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

let User = module.exports = mongoose.model( 'user', UserSchema );

module.exports.createNewPendingUser = function ( googleID, email, callback ) {
  pendingUser.addPendingUser( googleID, email, callback );
};

module.exports.acceptPendingUser = function( userInfo, callback ) {
  pendingUser.removePendingUser( userInfo.google_id, function( error ) {

    if( error ) {
      callback( error );
      return;
    }

    module.exports.upsert( userInfo, callback );

  } );
};

module.exports.createNew = function( userInfo, callback ) {
  User.create(userInfo, callback)
};

module.exports.upsert = function( userInfo, callback ) {

  let query = {
    google_id: userInfo.google_id
  };

  let update = {
    display_name: userInfo.display_name,
    admin_rights: userInfo.admin_rights,
    dev: userInfo.dev
  };

  let options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  User.findOneAndUpdate(query, update, options, function( error, data ) {

    if( error ) {
      callback( error );
      return;
    }

    callback( null, module.exports.getNetworkDataObjectFromDatabaseObject( data ) );

  } );
};

module.exports.getDatabaseObjectFromGoogleID = function ( userGoogleId, callback ) {
  console.log( "DB fetch user with google_id: " + userGoogleId );
  User.findOne( { google_id: userGoogleId }, callback );
};

module.exports.getNetworkDataObjectFromDatabaseObject = function ( userDatabaseObject ) {

  if ( userDatabaseObject === null ) {
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