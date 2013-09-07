var express = require('express');
var url = require('url');
var redis = require('redis');
var thrift = require('thrift');
var ttransport = require('thrift/lib/thrift/transport');
var service = require('../custom/gen-nodejs/TDACustom');
var types = require('../custom/gen-nodejs/TDACustom_types');

var app = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

console.log('Ready to process...');

app.post('/api/custom/:tenantId/:moduleName/:methodName/:position', function(req, res) {

    console.log('req.body.length = ' + req.body.length);

	// Make sure that body data was passed in with the request...
    if (Object.keys(req.body).length == 0) {
	/* Sample data:
	{
	  "numberOfArguments": 2,
	  "arguments": [
	    {"attribute": "numChickens", "value": 42},
	    {"attribute": "numPigs", "value": 3}
	  ]
	}
	*/
	  console.log('No body data passed...');
	  res.send(500, "No input data");
      res.end();
      return;
    }

	 console.log('API call for tenant ' + req.params.tenantId + ' module ' + req.params.moduleName + ' with method ' + req.params.methodName + ' at position ' + req.params.position + ' was made.');

	 // Prepare the payload for Thrift
	 var thriftPayload = new TDACustomPayload();
	 thriftPayload.numberOfArguments = req.body.numberOfArguments;
	 thriftPayload.arguments = {};
	 for(var i=0 ; i<req.body.arguments.length ; i++) {
       thriftPayload.arguments[req.body.arguments[i].attribute] = req.body.arguments[i].value;
	 }
	 console.log('thriftPayload = %j', thriftPayload);

	// Connect to redis
	redisClient = redis.createClient();
	redisClient.on('error', function(err) {
	  console.log('Redis error: ' + err);
	  res.send(500, err);
	  redisClient.quit();
      res.end();
	});

	// See if the method is registered by checking Redis...
	var key = req.params.tenantId + '|' + req.params.moduleName  + '|' + req.params.methodName + '|' + req.params.position;
	console.log('searching redis for key ' + key);
	redisClient.get(key, function(err, reply) {
		if (reply) {
			// There is a method override registered
			var response = new TDACustomResult();
			response.success = true;
			response.returnValue = 0;
			response.returnString = "OK";
			response.numberOfArguments = 2;
			response.transformedArguments = {};
			response.transformedArguments['numChickens'] = 42;
			response.transformedArguments['numPigs'] = 3;
			
			var url_parts = url.parse(req.url, true);
			var query = url_parts.query;

			var finalResponse = JSON.stringify(response);
			finalResponse = query.callback + '(' + finalResponse + ');';
			redisClient.quit();
			res.end(finalResponse);
		} else {
			// No method override registered, return a 404
			res.send(404, 'No method override registered');
			redisClient.quit();
			res.end();
		}
	});
});

app.listen(8080);
