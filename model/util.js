module.exports.removeMongoDBFields = function( obj ) {

  obj["__v"] = undefined;

  // TODO: Figure out why this isn't working
  obj._id = undefined;

  console.log( "OBJ: " + JSON.stringify( obj ) );

  return obj;
};