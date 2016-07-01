
var auth = require('authMod');

auth.signIn('user1', 'pwd1', onSuccess, onFailed);

function onSuccess(err, user) {
	if(err) {
		console.log(err.errText);
		return;	
	}
	console.log('Authentication Success...');
	console.log('User %s authentication successfully, he belongs to the role(s) %s ', user.userName, user.roles);
}

function onFailed(err) {
	console.log('Authentication Failed, reason %s Please try again...', err.errText);
}