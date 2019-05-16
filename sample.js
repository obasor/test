var fs = require('fs');
var csv = require('fast-csv');
let list = [];
let myData ;
let count = 0;

function MyModel(){
	return ['davo' , 'macci', 'spot', 'kiwi'];
}


function findById() {
    return ['davo' , 'macci', 'spot', 'kiwi']
};





var read = fs.createReadStream('my.csv')
	.pipe(csv({delimiter: '\t'}))
 	// .transform(function(data, next){
  //    	findById(data.id, next);
 	// })
	.on('data',function(data){  // this function executes once the data has been retrieved
    console.log(data);  // see, data is already an array
    	//list = data; // so you might not need to do this
	
	let dup = [...new Set(data)]; //remove duplicates ES6
	console.log(...data); //spredd array
	console.log(data[count]);
	console.log(data.length); //the length
	console.log('this' + dup);
	if(data.includes('davo')){ /// is in the array
		console.log('the record # ' + count + ' contains davo')
	}
    for(let i = 0; i < list.length; i++){
      // console.log(list[i]);
      list.push(list[i]);
    }
    count += 1;
})
.on('end', function(data){

    console.log('Read finished ' + data + ' records');
})

//console.log(read);
// csv
//    .writeToStream(fs.createWriteStream("my.csv"), [
//        ["a", "b"]
//        // ["a1", "b1"],
//        // ["a2", "b2"]
//    ])

   //    .write([
   //     ["davo", "b"],

   // ])

console.log("test");


// const request = async () => {
//     const response = await fetch('https://api.com/values/1');
//     const json = await response.json();
//     console.log(json);
// }

// var array1 = [1, 2, 3];

// console.log(array1.includes(2));
// expected output: true

////copy csv in a new file
// const fs = require('fs');
// const fastCsv = require('fast-csv');

// const datas = {}; // data['123'] = CSV data filtered for id = 123
// const options = {headers: true, delimiters: '\t'}; // relative to your CSV usage

// fastCsv
//     .fromPath('my.csv', options)
//     .on('data', d => {
//         if (!datas[d.id]) datas[d.id] = [];
//         datas[d.id].push(d)
//     })
//     .on('end', () => {
//         Object.keys(datas).forEach(id => {
//             // For each ID, write a new CSV file
//             fastCsv
//                 .write(datas[id], options)
//                 .pipe(fs.createWriteStream(`./data-id-${id}.csv`));
//         })
//     });