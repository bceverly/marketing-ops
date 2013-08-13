var thrift = require('thrift');
var ttransport = require('thrift/lib/thrift/transport');
var service = require('./gen-nodejs/LegacyClassService');
var types = require('./gen-nodejs/ThriftBridgeServer_types');

var connection = thrift.createConnection('localhost', 9090, {transport: ttransport.TBufferedTransport});
var client = thrift.createClient(service, connection);

connection.on('error', function(err) {
  console.error(err);
});

client.AddTwoNumbers(15, 12, function(err, response) {
  if (err) {
    console.error(err);
	connection.end();
  } else {
    console.log('AddTwoNumbers(15,12) returned:' + response);
	connection.end();
  }
});