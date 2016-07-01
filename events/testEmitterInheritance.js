
//creating instance based on "Security" constructor
var securityMod = require('security').Security;
var Security = new securityMod();

//register for Security events
var User = null;
Security.on('LOGIN_SUCCESS', function(err, user) {
	User = user;
	console.log('User %s login successful', user.userName);
	Security.logout(user);
});
Security.on('LOGIN_FAILED', function(err) {
	console.log(err.errText)
});
Security.on('LOGOUT_DONE', function() {	
	console.log('User %s logged out', User.userName)
	User = null;
});

Security.authenticate('admin', 'admin');

//console.log('Authentication is in progress...');
//Security.authenticate('admin1', 'admin');
