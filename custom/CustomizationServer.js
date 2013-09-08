var thrift = require('thrift');
var ttransport = require('thrift/lib/thrift/transport');
var service = require('./gen-nodejs/TDACustom');
var types = require('./gen-nodejs/TDACustom_types');

console.log('Thrift server awaiting connections...');

var server = thrift.createServer(service, {
	PerformCallout: function(tenantId, moduleName, methodName, position, arguments, result) {
		// Prepare the default return structure
		var retVal = new TDACustomResult();
		retVal.success = true;
		retVal.returnValue = 0;
		retVal.returnString = "OK";
		retVal.continueProcessing = true;

		// Copy over the default arguments passed in
		var args = Object.getOwnPropertyNames(arguments.arguments);
		retVal.numberOfArguments = args.length;
		retVal.transformedArguments = {};
		for (var i=0 ; i<args.length; i++) {
			retVal.transformedArguments[args[i]] = arguments.arguments[args[i]];
		}
		
		// Perform custom actions
		switch(moduleName) {
			case 'Customer':
				switch(methodName) {
					case 'GetById':
						switch(position) {
							case 0:
								var customerName = retVal.transformedArguments['name'];
								customerName = 'Custom-' + customerName;
								retVal.transformedArguments['name'] = customerName;
								break;
								
							case 1:
								var customerName = retVal.transformedArguments['name'];
								customerName = customerName + '-Custom';
								retVal.transformedArguments['name'] = customerName;
								break;
								
							default:
								var err = 'Unregistered customization called for position ' + position;
								console.log(err);
								retVal.success = false;
								retVal.returnValue = -1;
								retVal.returnString = err;
								retVal.continueProcessing = false;
								break;
						}
						break;
					default:
						var err = 'Unregistered customization called for method ' + methodName;
						console.log(err);
						retVal.success = false;
						retVal.returnValue = -1;
						retVal.returnString = err;
						retVal.continueProcessing = false;
						break;
				}
				break;
				
			default:
				var err = 'Unregistered customization called for module ' + moduleName;
				console.log(err);
				retVal.success = false;
				retVal.returnValue = -1;
				retVal.returnString = err;
				retVal.continueProcessing = false;
		}

		// Return the results
		result(null, retVal);
	}
}, { //server options
  'transport': ttransport.TBufferedTransport
});


server.listen(8081);