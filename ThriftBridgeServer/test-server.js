var thrift = require('thrift');
var ttransport = require('thrift/lib/thrift/transport');
var service = require('./gen-nodejs/ProductService');
var types = require('./gen-nodejs/ThriftBridgeServer_types');

var connection = thrift.createConnection('localhost', 9090, {transport: ttransport.TBufferedTransport});
var client = thrift.createClient(service, connection);

connection.on('error', function(err) {
  console.error(err);
});

client.GetProductById(1, function(err, response) {
  if (err) {
    console.error(err);
	connection.end();
  } else {
    console.log('GetProductById(1) returned:' + response);
	connection.end();
  }
});