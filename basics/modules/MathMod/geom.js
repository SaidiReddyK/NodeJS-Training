
var pi = 3.14;

function dia(rad) {
	return ( 2 * pi );
}

function circum(dia) {
	return ( dia * pi );
}

module.exports = {
	Diameter: dia,
	Cicumference: circum
};