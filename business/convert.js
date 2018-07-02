let json2csv = require( 'json2csv' ).parse;

module.exports.installToCSV = function( jsonData ) {

  let fields = [
    'install_num',
    'address.street',
    'address.city',
    'address.state',
    'address.zip'
  ];

  let options = { fields };

  return json2csv(jsonData, options);

};
