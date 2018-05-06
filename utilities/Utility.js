let fs = require('fs');
module.exports = {
	shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	},
	contains(arr, x) {
    	return arr.filter(function(elem) { return elem.id == x.id }).length > 0;
	},
	chunkify(a, n, balanced) {
    
	    if (n < 2)
	        return [a];

	    var len = a.length,
	            out = [],
	            i = 0,
	            size;

	    if (len % n === 0) {
	        size = Math.floor(len / n);
	        while (i < len) {
	            out.push(a.slice(i, i += size));
	        }
	    }

	    else if (balanced) {
	        while (i < len) {
	            size = Math.ceil((len - i) / n--);
	            out.push(a.slice(i, i += size));
	        }
	    }

	    else {

	        n--;
	        size = Math.floor(len / n);
	        if (len % size === 0)
	            size--;
	        while (i < size * n) {
	            out.push(a.slice(i, i += size));
	        }
	        out.push(a.slice(size * n));

	    }

	    return out;
	},
	isEmptyObject( obj ) {
	    for ( var name in obj ) {
	        return false;
	    }
	    return true;
	},
	readKittensFromDisk(filename, numberFrom, numberTo){
		let text = fs.readFileSync(__dirname + '/../kittens/' + filename + numberFrom + '.txt', 'utf8');
		let splitText = text.split(",");

		for(let filenumber = numberFrom+1; filenumber <= numberTo; filenumber++){
			let secondText = fs.readFileSync(__dirname + '/../kittens/' + filename +filenumber+'.txt','utf8');
			let secondSplitText = secondText.split(",");
			for(let kittenID in secondSplitText){
				kittenID = secondSplitText[kittenID];
				if(!splitText.includes(kittenID)){
					splitText.push(kittenID);
				}
			}
		}

		return splitText;
	},
	saveKittenIds(kittens){
		output = [];
		for (var kitten in kittens){
			output.push(kittens[kitten].id);
		}
		fs.writeFile('kittens2.txt', output, (err) => {
	  	if (err) throw err;
	  	console.log('It\'s saved!');
	});},
		remove(array, element){
		return array.filter(function(e) { 
	    return e !== element;
	});

	},
	saveKittenIdsSpecific(kittens, generation){
		output = [];
		for (var kitten in kittens){
			output.push(kittens[kitten].id);
		}
		fs.writeFile('kittens'+'Generation'+generation+'.txt', output, (err) => {
	  	if (err) throw err;
	  	console.log('It\'s saved!');
	});},
		remove(array, element){
		return array.filter(function(e) { 
	    return e !== element;
	});

	}
	

};
