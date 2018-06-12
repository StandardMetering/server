
let errorCodes = {
  
  // No Error
  noError: -1,
  
  // General Errors
  general: 0,
  noDataTransmitted: 1,
  incorrectDataFormat: 2,
  unexpectedResponseStructure: 3,
  unexpectedErrorStructure: 4,
  undeclatedDataType: 5,
  unexpectedDataStructure: 6,
  
  // Client Errors
  clientGeneral: 600,
  
  tokenRequired: 601,
  tokenMalformed: 602,
  tokenDoesNotMatchAnyUser: 603,
  tokenExpired: 604,
  tokenGeneral: 605
};

module.exports.errorCodes = errorCodes;

module.exports.withNetworkObject = function( req, res, dataType, networkDataObject ) {

  let networkObject = {
    accepted: true,
    error: null,
    data_type: dataType,
    data: networkDataObject
  };

  console.log( "Sending Response: ", networkObject );
  
  res.setHeader('content-type', 'application/json');
  res.end( JSON.stringify( networkObject ) );

};

module.exports.withError = function( req, res, error ) {

  let networkObject = {
    accepted: false,
    error: error,
    data: null
  };
  
  console.log( "Sending Response: ", networkObject );
  
  res.setHeader('content-type', 'application/json');
  res.end( JSON.stringify( networkObject ) );

};