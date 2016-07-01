
function createTcpServer() {
	var net = require('net');

	//1. Create server socket
	var server = net.createServer();
	var port = 9090;

	//2. register for socket events
	server.on('error', function(err) {
		console.log('Socket error - '+err.message);		
	});

	server.on('listening', function() {
		console.log('TCP Server up and running...');
		var address = this.address;
		console.log('@address: %s, port %d', address.address, address.port);
		console.log('Max clients: '+this.maxConnections);
	});

	//when client completes handshake
	server.on('connection', function(socket) {
		//register for client sockets
		socket.on('data', function(data) {
			console.log('Client - '+ data.toString());
			socket.write('--Test---');
		});

		//when client gets terminated/ended
		socket.on('end', function() {
			console.log('Client connection is closed');
		});
	});

	//open the port and start listening
	server.listen(port);
}

createTcpServer();