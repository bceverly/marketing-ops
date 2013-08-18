var express = require('express');
var pg = require('pg');
var url = require('url');

var app = express();
var conString = "tcp://postgres:postgres@db.local/marketingops";

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

console.log('Ready to process...');

app.get('/api/customer/:id', function(req,res) {
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
            // Customer found.  Return result.
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;

            var response = JSON.stringify(result.rows[0]);
            response = query.callback + '(' + response + ');';
            console.log('response = ' + response);
            res.end(response);
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
