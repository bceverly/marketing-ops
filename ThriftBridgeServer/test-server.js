var thrift = require('thrift');
var ttransport = require('thrift/lib/thrift/transport');
var service = require('./gen-nodejs/ProductService');
var types = require('./gen-nodejs/ThriftBridgeServer_types');

var connection = thrift.createConnection('192.168.12.135', 9090, {transport: ttransport.TBufferedTransport});
var client = thrift.createClient(service, connection);

connection.on('error', function(err) {
  console.error(err);
});

client.GetProductById(1, function(err, response) {
  if (err) {
    console.error(err);
	connection.end();
  } else {
    console.log('GetProductById(1) returned:');
	console.log('  id = ' + response.id);
	console.log('  name = ' + response.name);
	console.log('  notes = ' + response.notes);
	connection.end();
  }
});
