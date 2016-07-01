
var http = require('http');

function makeRequest(reqId) {
	var options = {
		host : 'localhost', 
		port : 9999, 
		path : '/index.html',
		method : 'GET'
	}

	var request = http.request(options, function(response) {
		response.on('data', function(data) {
			console.log(data.toString());
		});
	});

	request.on('error', function(err) {
		console.log(err.message);
	});
	request.end();
}

var totalReqs = 100;

for (var i = 1; i <= totalReqs; i++) {
	makeRequest(i);
}