var thrift = require('thrift');
var ttransport = require('thrift/lib/thrift/transport');
var service = require('./gen-nodejs/TDACustom');
var types = require('./gen-nodejs/TDACustom_types');

console.log('Thrift server awaiting connections...');

var server = thrift.createServer(service, {
	PerformCallout: function(tenantId, moduleName, methodName, position, arguments, result) {
		// Do the work
		console.log('PerformCallout was called with tenantId ' + tenantId + ' for modoule ' + moduleName + ' and method ' + methodName + ' at position ' + position);
		console.log('arguments = %j', arguments);
		var args = Object.getOwnPropertyNames(arguments.arguments);
		for (var i=0 ; i<args.length; i++) {
			console.log('arguments[' + args[i] + '] = ' + arguments.arguments[args[i]]);
		}
		
		// Package the return value
		var retVal = new TDACustomResult();
		retVal.success = true;
		retVal.returnValue = 0;
		retVal.returnString = "OK";
		retVal.numberOfArguments = 2;
		retVal.transformedArguments = {};
		retVal.transformedArguments['numCustomChickens'] = "142";
		retVal.transformedArguments['numCustomPigs'] = "13";
		result(null, retVal);
	}
}, { //server options
  'transport': ttransport.TBufferedTransport
});


server.listen(8081);