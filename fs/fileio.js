// fileio.js
// load core module - "fs"
var fs = require('fs');
// retrieves the name of file to read/open 
// which is supplied through command line parameters ... c:\> node fileio ../security.js
function getFileName() {
	if(process.argv.length > 2){
		return process.argv[2];
	}
	return null; // if file name not supplied
}
function readFile(){
	var file = getFileName();
	if(!file){
		console.log('No file specified...');return;
	}
	// get full path of the file
	try{
	var filePath = fs.realpathSync(file);
	}catch(ex){
	console.log(ex); return;
	}
	console.log('File:'+filePath);
	//check if the file exists (async call)
	fs.exists(filePath,function(exists){
		if(exists == false){
			console.log('Specified file doesn\t exists');return;
		}
		console.log('File exists and reading..');
		var fileSize = 0;
		fs.stat(filePath,function(err,stats){
			if(err){
				console.log('Error in getting file details..\n',err);return;
			}
			fileSize = stats.size;
			console.log('File details....'
				+'\n\t is file:'+stats.isFile()
				+'\n\t is file:'+stats.isDirectory()
				+'\n\t is file:'+stats.isSocket()
				+'\n\t is file:'+stats.size
				);
			// read file content
			fs.open(filePath,'r',function(err,fd){ // Level-3
				if(err){
					console.log('Error opening file,\n'+err);
					return;
				}
				var buff = new Buffer(fileSize);
				fs.read(fd,buff,0,fileSize,0,function(err,content){ // Level-4
					if(err){
						console.log('Error reading file,\n'+err);
						return;
					}
					console.log('File contents');
					console.log(buff.toString());
				});
			fs.close(fd,function(err){
				if(!err)console.log('File closed..');
			});//---close()
		});//---open()
	});//---starts()
});//---exists()	
}

function fsReadFile(){
	var fileName = getFileName();
	fs.readFile(fileName,'utf8',function(err,content){
		if(err){
			console.log('Error reading file');return;
		}
		console.log('File contents..\n'+content);
	});
}

function useRWStreams(shouldZip) {
	var fileName = getFileName();
	console.log('Dir: %s \n File: %s ',__dirname, __filename);
	var outfile = __dirname + "/out" + Date.now() + '.txt';
	var readStream = fs.createReadStream(fileName);
	var writeStream = null;

	if(shouldZip) {
		outfile += '.gz';
		writeStream = fs.createWriteStream(outfile);
		compress(readStream, writeStream);
	} else {
		writeStream = fs.createWriteStream(outfile);
		//read from readStream and write into writeStream -- PIPE
		readStream.pipe(writeStream);
	}	
}

function compress(source, target) {
	// create instance of "gzip" compressor
	var gzip = require('zlib').createGzip();
	// source => gzip => target
	source.pipe(gzip).pipe(target);
}

useRWStreams(true);

//fsReadFile();
//readFile();