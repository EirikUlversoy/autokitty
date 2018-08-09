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
		fancyReadKittensFromDisk(filename, numberFrom, numberTo){
		let text = fs.readFileSync(__dirname + '/../fancids/' + filename + numberFrom + '.txt', 'utf8');
		let splitText = text.split(",");

		for(let filenumber = numberFrom+1; filenumber <= numberTo; filenumber++){
			let secondText = fs.readFileSync(__dirname + '/../fancids/' + filename +filenumber+'.txt','utf8');
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
	saveKittenIds(kittens, name){
		output = [];
		for (var kitten in kittens){
			output.push(kittens[kitten].id);
		}
		fs.writeFile(name + '.txt', output, (err) => {
	  	if (err) throw err;
	  	//console.log('It\'s saved!');
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
	  	//console.log('It\'s saved!');
	});},
		remove(array, element){
		return array.filter(function(e) { 
	    return e !== element;
	});

	},
	separateByGeneration(cats, max_generation, min_generation){
		var o = {};
		var filteredCatList = [];
		let generationDictionary = {};

		for (var kitten in cats){
			kitten = cats[kitten];
			let generation = kitten.generation;

			if(!o[generation]){
				o[generation] = [];
			}
			o[generation].push(kitten);

			if(generation <= max_generation){
				if(generation >= min_generation){
					o[generation].push(kitten);
					filteredCatList.push(kitten);
				}

			}

		}

		return filteredCatList;
	},
	isReadyFilter(cats){
		let filteredCatList = [];
		for(var cat in cats){
			if(cats[cat].isReady){
				filteredCatList.push(cats[cat]);
			}
		}
		return filteredCatList;
	},
	outputStatistics(cats, targetedTraits, GeneDecoder){
		let statsDict = GeneDecoder.statistics(cats, 0);

		console.log("R3 stats: " + targetedTraits[0] + ": " + statsDict[targetedTraits[0]]);
		console.log("R3 stats: " + targetedTraits[1] + ": " + statsDict[targetedTraits[1]]);

		statsDict = GeneDecoder.statistics(cats, 1);
		console.log("R2 stats: " + targetedTraits[0] + ": " + statsDict[targetedTraits[0]]);
		console.log("R2 stats: " + targetedTraits[1] + ": " + statsDict[targetedTraits[1]]);

		var statsDict = GeneDecoder.statistics(cats, 2);
		console.log("R1 stats: " + targetedTraits[0] + ": " + statsDict[targetedTraits[0]]);
		console.log("R1 stats: " + targetedTraits[1] + ": " + statsDict[targetedTraits[1]]);

		var statsDict = GeneDecoder.statistics(cats,3);
		console.log("D stats: " + targetedTraits[0] + ": " + statsDict[targetedTraits[0]]);
		console.log("D stats: " + targetedTraits[1] + ": " + statsDict[targetedTraits[1]]);
	},
	//Takes two cats and compares their matrons and sires. Depends on the last gotten info from calling the
	//contracts "getKitten" function
	isRelated(catA,catB){
		var isRelated = ((catA.matronId == catB.matronId) || (catA.sireId == catB.sireId));
		var isRelatedB = ((catA.matronId == catB.sireId) || (catB.matronId == catA.sireId) || (catA.sireId == catB.matronId) || (catB.sireId == catA.matronId));
		isRelated = isRelated || isRelatedB;
		if(catA.generation == 0 && catB.generation == 0){
			isRelated = false;
		}
		return isRelated;
	},
	float2int (value) {
	    return value | 0;
	},
	anyTraitInListIsExtreme(targetedTraits){
		var extremeList = ["Otaku","Peach","Chartreux","Harbourfog","Hintomint","Dragonfruit","Wild_7","Wild_a","Wasntme","Violet","Secret_1","Non-rel_pattern_7","Mystery_8","Butterscotch","Vigilante"];

		for(var trait in targetedTraits){
			if(extremeList.includes(targetedTraits[trait])){
				return true;
			}
		}
		return false;
	},
	anyTraitInListIsRare(targetedTraits){
		var rareList = ["Manul","Belch","Beard","Peach","Emeraldgreen","Missmuffett","Nachocheez","Springcrocus","Serpent","Caffeine","Baddate","Forgetmenot","Camo","Calicool","Environment_b"];

		for(var trait in targetedTraits){
			if(rareList.includes(targetedTraits[trait])){
				return true;
			}
		}
		return false;
	},
	bothCatsAreReady(cat, potentialPartner){
		return cat.isReady && potentialPartner.isReady;
	},
	printFive(listToPrint){
		for(var item in listToPrint){
			if(item < 5){
				console.log(listToPrint[item]);
			}
		}
	},
	isEmptyObject( obj ) {
	    for ( var name in obj ) {
	        return false;
	    }
	    return true;
	},
	getCatsWithTargetTraits(GeneDecoder, cats, targetedTraits){
		var traitLists = {}
		var newCats = [];
		function isEmptyObject( obj ) {
		    for ( var name in obj ) {
		        return false;
		    }
		    return true;
		};
		
		for(var trait in targetedTraits){
			traitLists[targetedTraits[trait]] = [];
		}

		for(var cat in cats){
			//var GeneDecoder = require('../genedecoder')();
			var newKitten = GeneDecoder.simpleFilter(cats[cat], targetedTraits);
			if(!isEmptyObject(newKitten.chanceOfTrait)){
				newCats.push(newKitten);
			}
		}
		console.log("Found " + newCats.length + " filtered cats!");
		return newCats;
	}

	

};
