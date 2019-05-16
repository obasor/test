var fs = require('fs');
var csv = require('fast-csv');

const allproducts = [];
const prname = [];
const prcat = [];

fs.createReadStream('products.tab')
	.pipe(csv({delimiter: '\t'}))
	.on('data',function(data) {
		prname.push(data[0])
		prcat.push(data[1])
	})
	.on('end', function(data){
		fs.createReadStream('sales.tab')
		.pipe(csv({delimiter: '\t'}))
		.on('data',function(data){
			if(prname.includes(data[0])) {
				var index = prname.indexOf(data[0]); //returns the index of prname that the match happenn
				if(typeof prname[index] !== 'undefined'){
					allproducts.push([data[0],prcat[index],data[1]])// create array from both db. - or prname[index],prcat[index],data[1]
				}
			}
		}) 
		.on('end', function(data){
		var category = 'Breakfast';
		let catavrg = allproducts.filter(function (x) { return x[1] === category });
		let averageprice = allproducts.map(function (x) { return x[2] });
		let avgprice = catavrg.map(function (x) { return x[2] });
		const max = Math.max(...avgprice);
		const min = Math.min(...avgprice);
		const maxprice = Math.max(...averageprice);
		const all_average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
		const average_result = all_average( averageprice.map(Number) );
		const results = allproducts.filter(function (x) { return Number(x[2]) === maxprice });
			
		console.log('The total average for all sales is',average_result); //print average price from all products
		results.map(function (x) { return console.log('The category with the highest sales price is', x[1],'with', maxprice, 'Business name :', x[0]) })
		console.log('The maximum sale in the category',category,'is ' + max + ' and the minimun ' + min)
		}) 
	})
