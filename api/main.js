var http = require('http');
var express = require('express');
var pg = require('pg');
var url = require('url');
var redis = require('redis');
var thrift = require('thrift');
var ttransport = require('thrift/lib/thrift/transport');
var service = require('../ThriftBridgeServer/gen-nodejs/ProductService');
var types = require('../ThriftBridgeServer/gen-nodejs/ThriftBridgeServer_types');

var app = express();
var conString = "tcp://postgres:postgres@db.local/marketingops";

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

console.log('Ready to process...');

app.get('/api/customize/:state', function(req, res) {
    var key = '1|Customer|GetById|1';
    console.log('req.params.state = ' + req.params.state);

	if (req.params.state == "0") {
		// disable customizations
	    redisClient = redis.createClient();
	    redisClient.on('error', function(err) {
	      console.log('Redis error: ' + err);
	      res.send(500, err);
	      redisClient.quit();
	      res.end();
	    });
	    redisClient.del(key, function(err) {
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;

            var response = JSON.stringify({'Customization': false});
            response = query.callback + '(' + response + ');';
            console.log('response = ' + response);
            res.end(response);
        });		
	} else {
		// enable customizations
	    redisClient = redis.createClient();
	    redisClient.on('error', function(err) {
	      console.log('Redis error: ' + err);
	      res.send(500, err);
	      redisClient.quit();
	      res.end();
	    });
	    redisClient.set(key, 'localhost:8081', redis.print);
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        var response = JSON.stringify({'Customization': true});
        response = query.callback + '(' + response + ');';
        console.log('response = ' + response);
        res.end(response);
	}
});

app.get('/api/product/:id', function(req, res) {
	console.log('API call for product lookup by ID made.');
	
	var connection = thrift.createConnection('192.168.56.102', 9090, {transport: ttransport.TBufferedTransport});
	var client = thrift.createClient(service, connection);
	
	connection.on('error', function(err) {
	  console.error(err);
      res.send(500, err);
      res.end();
	});

	client.GetProductById(1, function(err, response) {
	  if (err) {
	    console.error(err);
		connection.end();
        res.send(500, err);
		connection.end();
        res.end();
	  } else {
		if (typeof response === 'undefined')
		{
            // Product was not found.  Return appropriate HTTP error code.
            console.log('customer not found for id ' + req.params.id);
            res.json(null, 404);
            res.end();
		} else if (null == response) {
            // Product was not found.  Return appropriate HTTP error code.
            console.log('customer not found for id ' + req.params.id);
            res.json(null, 404);
            res.end();
		} else {
			// Product found.  Return result.
			var url_parts = url.parse(req.url, true);
			var query = url_parts.query;

			console.log('response from thrift call: ');
			console.log('  response.id = ' + response.id);
			console.log('  response.name = ' + response.name);
			console.log('  response.notes = ' + response.notes);
			
			var finalResponse = JSON.stringify(response);
			finalResponse = query.callback + '(' + finalResponse + ');';
			console.log('finalResponse = ' + finalResponse);
			connection.end();
			res.end(finalResponse);
		}
	  }
	});
});

app.get('/api/customer/:id', function(req,res) {
  // Insert position 0 (top of method) customization shim
  // End of position 0 (top of method) customization shim
	
  // Body of uncustomized method
  console.log('API call for customer lookup by ID made.');
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      // Error connecting to database
      console.log('Error connecting to database.');
      res.send(500, err);
      res.end();
    } else {
      console.log('Ready to query...');
      // Execute the query to retrieve the customer by id
      client.query('SELECT * from customer where id=' + req.params.id, function(err, result) {
        if (err) {
          // Error executing query
          console.log('Error executing query');
          res.send(500, err);
          res.end();
        } else {
          // Query was successful.  Did we find the customer?
          if (result.rows.length > 0) {
			var retVal = result.rows[0];
			
			// Insert position 1 (end of method) customization shim
			console.log('Getting ready to check for position 1 customization');
		    // Connect to redis
		    redisClient = redis.createClient();
		    redisClient.on('error', function(err) {
		      console.log('Redis error: ' + err);
		      res.send(500, err);
		      redisClient.quit();
		      res.end();
		    });

		    // See if the method is registered by checking Redis...
		    var key = '1|Customer|GetById|1';
		    console.log('Looking for redis key ' + key);
		    redisClient.get(key, function(err, reply) {
		      if (reply) {
			    // A customization has been registered, make the call
			    console.log('A customization was found');
			    var jsonPayload = JSON.stringify({
				  "numberOfArguments": 3,
				  "arguments": [
				    {"attribute": "id", "value": retVal.id.toString()},
				    {"attribute": "name", "value": retVal.name.toString()},
				    {"attribute": "notes", "value": retVal.notes.toString()}
				  ]
			    });
			    console.log('jsonPayload = %j', jsonPayload);
			    var postHeaders = {
				  'Content-Type': 'application/json',
				  'Content-Length': Buffer.byteLength(jsonPayload, 'utf8')
			    };
			    console.log('postHeaders = ' + postHeaders);
			    var postOptions = {
				  host: 'localhost',
				  port: '8080',
				  path: '/api/custom/localhost/8081/1/Customer/GetById/1',
				  method: 'POST',
				  headers: postHeaders
			    };
			    console.log('postOptions = %j', postOptions);
			    var reqPost = http.request(postOptions, function(postResponse) {
				  postResponse.setEncoding('utf-8');
				
				  var responseString = '';
				
				  postResponse.on('data', function(data) {
					responseString += data;
				  });
				  postResponse.on('end', function() {
					// Overwrite the data to be returned
					console.log('response received: %j', responseString);
					var resultObject = JSON.parse(responseString);
					console.log('resultObject = %j', resultObject);
					retVal.id = resultObject.transformedArguments['id'];
					retVal.name = resultObject.transformedArguments['name'];
					retVal.notes = resultObject.transformedArguments['notes'];

				    // Return the potentially modified data...
		            console.log('Building return value');
		            var url_parts = url.parse(req.url, true);
		            var query = url_parts.query;

		            var response = JSON.stringify(retVal);
		            response = query.callback + '(' + response + ');';
		            console.log('response = ' + response);
		            res.end(response);
				  });
			    });
			    reqPost.write(jsonPayload);
			    reqPost.end();
		      } else {
			    // No customization found.  Return as usual
	            console.log('Building return value');
	            var url_parts = url.parse(req.url, true);
	            var query = url_parts.query;

	            var response = JSON.stringify(retVal);
	            response = query.callback + '(' + response + ');';
	            console.log('response = ' + response);
	            res.end(response);
		      }
		    });
			// End of position 1 (end of method) customization shim
          } else {
            // Customer was not found.  Return appropriate HTTP error code.
            console.log('customer not found for id ' + req.params.id);
            res.json(null, 404);
            res.end();
          }
        }
      });
    }
  });
});

app.listen(3456);
