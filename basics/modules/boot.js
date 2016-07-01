//File-module example

var appName = "VerizonNode";

function startApp() {
	console.log('My Node App %s started and it is ready....', appName);
}

module.exports = { 
	StartApp : startApp 
};