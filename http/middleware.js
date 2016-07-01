
function addHeader(name, value) { //Async middleware component
	return function(req, res, next) {
		res.setHeader(name, value);
		// continue with next middleware in the stack
		next(); 
	};
}

function addMessage() {
	return function(req, res, next) {
		res.end('<h2>Welocme to NodeJS HTTP Middleware</h2>');
		// continue with next middleware in the stack
		next(); 
	};
}

module.exports = {
	hello: addMessage,
	addSign: addHeader
};