var API_SERVER_IP   = '192.168.56.103';
var API_SERVER_PORT = '3456';
var API_TIMEOUT     = 5000;

function generateURL(route) {
	// Generate the URL for the REST calls from the global constants
	return 'http://' + API_SERVER_IP + ":" + API_SERVER_PORT + route;
}

function setBusinessLogicCustomization(onOff) {
	// Turn business logic customizations on or off depending on the value of the boolean
	// variable passed in.
	var theURL = '/api/customize/';
	var enableSuccessMessage = '&nbsp;';
	var enableErrorMessage = '&nbsp;';
	var disableErrorMessage = '&nbsp;';
	var disableSuccessMessage = '&nbsp;';
	
	// Based on the state, set up the appropriate local variables
	if (onOff) {
		theURL += '1';
		enableSuccessMessage = 'Business logic customizations are enabled.  You should see "-Custom" added to the name of the customer returned on the Node Native test.';
		enableErrorMessage = 'Error attempting to enable business logic customizations.';
	} else {
		theURL += '0';
		disableSuccessMessage = 'Business logic customizations are disabled.  The Node Native results should not include a "-Custom" suffix on the name returned.';
		disableErrorMessage = 'Error attempting to disable business logic customizations.';
	}
	
	// Make the AJAX call
	$.ajax({
		url: generateURL(theURL),
		dataType: 'jsonp',
		cache: false,
		timeout: API_TIMEOUT,
		success: function(data) {
			$('#enableCustomizationResults').html(enableSuccessMessage)
			$('#disableCustomizationResults').html(disableSuccessMessage);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			$('#enableCustomizationResults').html(enableErrorMessage)
			$('#disableCustomizationResults').html(disableErrorMessage);
	  	}
	});
}

$(document).ready(function() {
	// Set the initial state of customizations to off
	setBusinessLogicCustomization(false);
});

$('#enableCustomization').click(function() {
	// Turn business logic custmomizations on
	$('#enableCustomizationResults').html('Toggling...');
	setBusinessLogicCustomization(true);
});

$('#disableCustomization').click(function() {
	// Turn business logic customizations off
	$('#disableCustomizationResults').html('Toggling...');
	setBusinessLogicCustomization(false);
});

$('#nodeNative').click(function() {
	// Change the UI so that if this times out, we can see what's going on
	$('#nodeNativeResults').html('Testing...');

	// Make the AJAX call
	$.ajax({
		url: generateURL('/api/customer/1'),
		dataType: 'jsonp',
		cache: false,
		timeout: API_TIMEOUT,
		success: function(data) {
			var results = '<p>Results of call to route /api/customer/1:<br />';
			results += '&nbsp;&nbsp;id = ' + data.id + '<br />';
			results += '&nbsp;&nbsp;Name = ' + data.name + '<br />';
			results += '&nbsp;&nbsp;Notes = ' + data.notes + '</p>';
			$('#nodeNativeResults').html(results);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			$('#nodeNativeResults').html('Error calling NodeNative REST route...');
		}
	});
});

$('#nodeThrift').click(function() {
	// Change the UI so that if this times out, we can see what's going on
	$('#nodeThriftResults').html('Testing...');

	// Make the AJAX call
	$.ajax({
		url: generateURL('/api/product/1'),
		dataType: 'jsonp',
		cache: false,
		timeout: API_TIMEOUT,
		success: function(data) {
			var results = '<p>Results of call to route /api/product/1:<br />';
			results += '&nbsp;&nbsp;id = ' + data.id + '<br />';
			results += '&nbsp;&nbsp;Name = ' + data.name + '<br />';
			results += '&nbsp;&nbsp;Notes = ' + data.notes + '</p>';
			$('#nodeThriftResults').html(results);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			$('#nodeThriftResults').html('Error calling NodeThrift REST route...');
		}
	});
});