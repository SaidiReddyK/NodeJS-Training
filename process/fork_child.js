
process.on('message', function(data) {
	console.log('...Job is running....'+data.jobid);
	if(process.connected) {
		process.send(data);
	}
});

process.on('diconnect', function(data) {
	console.log('...Good bye from child....');
});