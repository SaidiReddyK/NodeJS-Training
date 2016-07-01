
function add(x, y) {
	return( x + y );
}

function mul(x, y) {
	return( x * y );
}

function sub(x, y) {
	return( x - y );
}

function div(x, y) {
	return( x / y );
}

module.exports = {
	Sum: add,
	Multiply: mul,
	Sub: sub,
	Div: div
};