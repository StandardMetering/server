let mongoose = require( 'mongoose' );

let PendingUserSchema = mongoose.Schema( {

  google_id: String,
  user_email: String

} );

let PendingUser = module.exports = mongoose.model( 'pending_user', PendingUserSchema );

module.exports.addPendingUser = function( googleId, email, callback ) {
  PendingUser.create( {google_id: googleId, user_email: email}, callback )
};

module.exports.removePendingUser = function ( googleId, callback ) {
  PendingUser.deleteOne( {google_id: googleId}, callback );
} ;

module.exports.getPendingUsers = function( callback ) {
  PendingUser.find( callback )
};

module.exports.upsert = function( googleId, email, callback ) {

  let query = {
    google_id: googleId
  };

  let update = {
    user_email: email
  };

  let options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  PendingUser.findOneAndUpdate(query, update, options, callback)
};