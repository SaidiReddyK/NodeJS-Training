
process.stdin.resume();
process.stdin.on('data', function(data) {
	try {
		var jobid = parseInt(data.toString(), 10);
		process.stdout.write(jobid + "\n");
	}
	catch(e) {
		process.stderr.write(e.message);
	}
})