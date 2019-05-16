var fs = require('fs');
var csv = require('fast-csv');

var categories = [];
var averageprice = [];
var product = [];
var breakfast = [];
var allproducts = [];

var prod = fs.createReadStream('products.tab')
	.pipe(csv({delimiter: '\t'}))
	.on('data',function(data) { 

	if(data.includes('Breakfast')) {

		breakfast.push(data[0])
	}

	var sales = fs.createReadStream('sales.tab')
	.pipe(csv({delimiter: '\t'}))
	.on('data',function(data2){
		if(data.includes(data2[0])){
			allproducts.push(data2[0],data[1],data2[1])
			product.push(data[0]);
			categories.push(data[1]);
			averageprice.push(data2[1]);
		 }
	})
})
.on('end', function(data){
	var count = 0;
	var avgprice = [];
	var bname = [];
	for(let i = 0; i < allproducts.length; i++){
		if(allproducts[i] === 'Breakfast'){
			count += 1
			bname.push(allproducts[i-1])
			avgprice.push(allproducts[i+1])
		}
	}
	var max = Math.max(...avgprice);
	var min = Math.min(...avgprice);
	var maxprice = Math.max(...averageprice);
	
	for(let i = 0; i < product.length; i++){
		if(averageprice[i] == maxprice) {
			console.log('The category with the highest sales price is', categories[i],'with', averageprice[i], 'Business name :', product[i],)
        }
	}
	console.log('The maximum sale in the category Breakfast is ' + max + ' and the minimun ' + min)

})

