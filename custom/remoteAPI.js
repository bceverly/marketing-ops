var express = require('express');
var url = require('url');
var redis = require('redis');
var thrift = require('thrift');
var ttransport = require('thrift/lib/thrift/transport');
var TDACustomService = require('../custom/gen-nodejs/TDACustom');
var types = require('../custom/gen-nodejs/TDACustom_types');

var app = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

console.log('Ready to process...');

app.post('/api/custom/:host/:port/:tenantId/:moduleName/:methodName/:position', function(req, res) {

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
	redisClient.get(key, function(err, reply) {
		if (reply) {
			 // Prepare the payload for Thrift
			 var thriftPayload = new TDACustomPayload();
			 thriftPayload.numberOfArguments = req.body.numberOfArguments;
			 thriftPayload.arguments = {};
			 for(var i=0 ; i<req.body.arguments.length ; i++) {
		       thriftPayload.arguments[req.body.arguments[i].attribute] = req.body.arguments[i].value.toString();
			 }

			// Call the thrift server
			var thriftConnection = thrift.createConnection(req.params.host, req.params.port, {transport: ttransport.TBufferedTransport});
			var thriftClient = thrift.createClient(TDACustomService, thriftConnection);
			thriftConnection.on('error', function(err) {
			  console.error('Thrift error: ' + err);
		      res.send(500, err);
		      res.end();
			});
			thriftClient.PerformCallout(req.params.tenantId, req.params.moduleName, req.params.methodName, req.params.position, thriftPayload, function(err, response) {
			  if (err) {
			    console.error('Error calling thrift: ' + err);
				connection.end();
		        res.send(500, err);
				connection.end();
		        res.end();
			  } else {
				if (typeof response === 'undefined')
				{
		            // No response data.  Return appropriate HTTP error code.
		            console.log('data not found ' + req.params.id);
		            res.json(null, 404);
		            res.end();
				} else if (null == response) {
		            // No response data.  Return appropriate HTTP error code.
		            console.log('data not found ' + req.params.id);
		            res.json(null, 404);
		            res.end();
				} else {
					// Return response data.
//					var url_parts = url.parse(req.url, true);
//					var query = url_parts.query;

					var finalResponse = JSON.stringify(response);
//					finalResponse = query.callback + '(' + finalResponse + ');';
					redisClient.quit();
					thriftConnection.end();
					res.end(finalResponse);
				}
			  }
			});
		} else {
			// No method override registered, return a 404
			res.send(404, 'No method override registered');
			redisClient.quit();
			res.end();
		}
	});
});

app.listen(8080);
