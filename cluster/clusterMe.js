
var cluster = require('cluster');

var os = require('os');

//query os parameters
var totalCPUs = os.cpus().length;

// logic for master
if (cluster.isMaster) {
	
	// register events to monitor workers
	console.log('Initializing Cluster (master)...'+totalCPUs);

	cluster.on('fork', function(worker) {
		console.log('Fork on %d worker', worker.id);
	});

	cluster.on('listening', function(worker, address) {
		console.log('Worker %d listening and ready....', worker.id);
	});

	cluster.on('disconnect', function(worker) {
		console.log('Worker %d got disconnected....', worker.id);
	});

	cluster.on('exit', function(worker, code, signal) {
		console.log('Worker %d exited with code %d', worker.id, code);
	});

	// create worker instances per CPU
	for (var i = 0; i < totalCPUs; i++) {
		console.log('Creating worker for %d CPU...', i);
		cluster.fork();	
	}
}
// logic for worker
else {
	console.log('Initializing worker....' + cluster.worker.id);

	// host web application
	createWebServer();
}

function createWebServer() {
	var http = require('http');
	http.createServer(function(req, resp) {
		if(req.method == 'GET') {
			resp.end('Processed by worker: '+ cluster.worker.id);
		}
	}).listen('9999');
}