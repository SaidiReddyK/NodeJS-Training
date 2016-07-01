
//load core module - "http"
var http = require('http');

function createSimpleServer() {
	
	//create http server socket
	var server = http.createServer(function(req, resp) {
		//write header - "Content - type"
		resp.writeHead(200, {
			'Content-Type': 'text/html',
			'x-PoweredBy' : 'Verizon(HYD)'
		});
		//resp.write('<html><h2>Welcome to NodeJS Web Server....</h2></html>');

		//ends response and flushes the response content
		resp.end('<h2>Welcome to NodeJS Web Server....</h2>');
	});


	//start the server
	server.listen(9191);
	console.log('Http Simple server ready and listening @9191');
}

function createHTTPServer() {

	//core module to parse reqeust "url"
	var url = require('url');
	
	var server = http.createServer(function(req, resp) {
		//verifyUrl(req, resp);

		//handle only GET request
		if(req.method == 'GET') {
			handleGetRequest(req, resp);
		} else if(['POST', 'PUT', 'DELETE'].indexOf(req.method) > -1) {
			//handle other http verbs except 'GET'
			handleApiRequest(req, resp);
		}
	});

	function handleGetRequest(req, response) {
		var url = require('url');
		var url_parsed = url.parse(req.url);
		//To work with file system path
		var path = require('path'); 
		var fs = require('fs');

		var filePath = path.join(__dirname, 'pages', url_parsed.pathname);
		fs.exists(filePath, function(exists) {
			if(exists == false) {
				response.statusCode = 404;
				response.end();
				return;
			}

			var fileStream = fs.createReadStream(filePath);
			var cType = getContentType(path.extname(filePath)) || 'text/plain';
			response.writeHead(200, {'Content-Type' : cType});
			fileStream.pipe(response);
		});
	}

	function handleApiRequest(req, response) {
		response.end('Processing %s API request...' +req.method);
	}

	function getContentType(extension) {
		var extensions = ['.html', '.css', '.js', '.jpeg', '.jpg', '.png'];
		var types = ['text/html', 'text/css', 'text/script', 'image/jpeg', 'image/jpg', 'image/png'];
		var idx = extensions.indexOf(extension);

		if(idx > -1) {
			return(types[idx]);
		}
		return undefined;
	}

	function verifyUrl(req, resp) {

		// http://uname:pwd@verizon.com:8080/home/enquiry?country=in&city=Hyd
		// http - protocol
		// uname:pwd - authentication details
		// verizon.com:8080 - host and port
		// home/enquiry - path
		// country=in&city=Hyd - query string
		var url_parsed = url.parse(req.url, true);
		resp.write('Inspecting request details \n');
		resp.write('Request for - ' +url_parsed.pathname);
		resp.write('with additional inputs - ' +url_parsed.search);
		resp.write('Complete Request details - ' +url_parsed.path);
		//resp.end();
	}

	server.listen(9292);
	console.log('HTTP Server listening @9292');
}

function createMiddlewareServer() {
	// load middleware module - "connect"
	var connect = require('connect');
	var middlewares = require('./middleware');
	var statics = require('serve-static');
	// create instance of server
	var app = connect();
	//configure middleware functions/components
	app.use(middlewares.addSign('PoweredBy', 'Verizon'));
	
	// serve the static files from folder pages
	app.use(statics('./pages'));
	app.use(middlewares.hello());
	
	app.listen(9393, function() {
		console.log('Middleware Server is up and running @9393...');
	});	
}

//To launch server
//createSimpleServer();
//createHTTPServer();
createMiddlewareServer();