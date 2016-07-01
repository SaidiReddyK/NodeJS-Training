
function exec() {
	var childprocess = require('child_process');	
	var child = childprocess.exec('dir c:\\', function(err, stdout, stderr) {  
			if(err) {
				console.log('Error: '+err.signal);
				console.log('%s \n %s', err.message, err.stack);
				return;
			}
			console.log('Output: \n' +stdout);
			console.log('Error: \n' +stderr);
		});

	// 'close' event will be triggered once standard streams are released
	child.on('close', function(code) {
		console.log('Child process closed with code : ' + code);
	});

	// 'exit' event will be triggered once the child process exits
	child.on('exit', function(code) {
		console.log('Child process exited with code : ' + code);
	});
}

function spawnEx() {
	//load core module
	var spawn = require('child_process').spawn;

	//spawn the child process 
	var child = spawn('node', ['spawn_child.js']);

	//communicate with child process using standard streams
	var interval = setInterval(function() {
		var jobid = (Math.random() * 1000);
		if(jobid > 900) {
			//To terminate child
			child.kill(); 
			clearInterval(interval);
			//child.stdin.emit('end');
		}
		else
		{
			child.stdin.write(jobid + "\n");
		}
	}, 200);

	//register for events against child process
	child.stdout.on('data', function(data) {
		console.log('Job is completed ', +data);
	});

	child.on('exit', function(code) {
		console.log('spawn child exited with code: ' +code);
	});
}

function forkEx() {
	var childprocess = require('child_process');
	var child = childprocess.fork(__dirname + '/fork_child');
	
	//event handler for "message" event
	child.on('message', function(data) {
		console.log('completed job: '+ data.jobid);
		if(data.jobid > 10) {
			child.disconnect();
			return;
		}
		data.jobid++;
		child.send(data);
	});

	//when disconnected from host
	child.on('disconnect', function() {
		console.log('BYEE CHILD...');
	});

	//initiate
	child.send({ jobid : 0 }); 
}

//test
//exec();
//spawnEx();
forkEx();