
var title = 'Verizon NodeJS';
console.log(title);

//loads file-module
var modBoot = require('./modules/boot');
modBoot.StartApp();

//loads folder-module
var math = require('./modules/MathMod');

var res = math.Arithmetic.Sum(12, 13);
console.log('Sum:::: '+res);

res = math.Geometric.Cicumference(4.5);
console.log('Cicumference:::: '+res);

