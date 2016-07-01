
var net = require('net');

function createTcpClient() {
	var config = {
		port : 9090, 
		host : '127.0.0.1'
	};

	var client = net.createConnection(config, function() {
		console.log('Connected to server');
	});

	client.on('data', function(data) {
		console.log('Server - '+data);
	});

	client.on('close', function(data) {
		console.log('Connection closed');
	});

	client.on('end', function(data) {
		console.log('Connection ended');
	});

	process.stdin.on('data', function(data) {
		if(data.toString().trim() == 'stop') {
			process.stdin.pause();
			client.end();
		}
		else {
			client.write(data);
		}
	});

	process.stdin.setEncoding('utf8');
}

createTcpClient();