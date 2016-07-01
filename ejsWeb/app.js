
var express = require('express');
//create server
var app = express();

app.use('/contact', function(req, resp) {
	resp.send('<strong>Email: enquiry@verizon.com</strong>');
});

//configuring express
app.set('view engine', 'jade');
app.set('views', './views');

//verb based middleware
app.get('/users', function(req, resp) {
	var user = {id:123, name:'Saidi'};
	resp.json(user);
});

app.use('/', function(req, resp) {
	//resp.send('<h2>Hello, from ExpressJS Server...</h2>');
	resp.render('index.jade', { message : '-by Verizon' });
});

app.listen(3000, function() {
	console.log('Express web is listening @3000');
});