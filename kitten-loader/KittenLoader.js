var Utilities = require('../utilities');
var fs = require('fs');
function KittenLoader(args){
	var self = {};
	var args = args;
	args = process.argv;
	self.loadTraits = function(trait_filename){
		console.log("Loading the file called:");
		console.log(trait_filename);
		let text = fs.readFileSync(__dirname + '/../traits/' + trait_filename + '.txt', 'utf8');
		let splitText = text.split(",");
		console.log(splitText);
		return splitText;
	}

	self.loadKittens = function(totalCatCount){
		console.log("total supply is: " + totalCatCount);
		var lowGenCatsOnly = false;
		var splitText = [];
		if(args[2] == "all-mutations"){
			let gen = parseInt(args[3],10);
			let kittens =  Utilities.readKittensFromDisk("kittensGeneration",gen,gen);
			for(var x = totalCatCount-5000; x < totalCatCount; x++){
				kittens.push(x);
			}

			return kittens;
		}

		if(args[2] == "pure-mutation"){
			let gen = parseInt(args[3],10);
			let kittens = Utilities.readKittensFromDisk("kittensGeneration",gen,gen);
			for(var x = totalCatCount-5000; x < totalCatCount; x++){

				kittens.push(x);
			}
			return kittens;
		}

		if(args[2] == "find_sire"){
			var kittens = Utilities.readKittensFromDisk("kittensGeneration",0,0);

			for(var x = totalCatCount - 2000; x < totalCatCount; x++){
				kittens.push(x);
			}

			return kittens;
		}
		if(args[2] == "one-mutation"){
			let gen = parseInt(args[4],10);
			let kittens = Utilities.readKittensFromDisk("kittensGeneration",gen,gen);
			for(var x = totalCatCount-5000; x < totalCatCount; x++){
				kittens.push(x);
			}

			return kittens;
		}

		if(args[2] == "show-available-mutations"){
			let gen = parseInt(args[3],10);
			var kittens = Utilities.readKittensFromDisk("kittensGeneration",gen,gen);
					for(var x = totalCatCount-5000; x < totalCatCount; x++){

				kittens.push(x);
			}

			return kittens;
		}
		if(args[2] == "make-fancy-cat"){
			var kittens = [];

			let from_gen = parseInt(args[3],10);
			let to_gen = parseInt(args[4],10);

			kittens = Utilities.readKittensFromDisk("kittensGeneration",from_gen,to_gen);
			if(args[7] == "X"){
				kittens = Utilities.fancyReadKittensFromDisk("squid/kittensGeneration",from_gen,to_gen);
			}

			for(var x = totalCatCount-5000; x <totalCatCount; x++){
			  kittens.push(x);
			}

			return kittens;
		}

		if(args[2] == "list-auctions"){
			let name = args[3];
			let kittens = Utilities.readKittensFromDisk('/cats_to_auction/' + name, 0, 0);
			return kittens;
		}

		if(args[2] == "send-cats"){
			let name = args[3];
			let kittens = Utilities.readKittensFromDisk('/send_cats/' + name, 0, 0);
			return kittens;
		}

		if(args[2] == "trait-search" || args[2] == "trait-search-multiple"){
			let gen = parseInt(args[4],10);
			let kittens = [];
			if(gen == 99){
				kittens = Utilities.readKittensFromDisk("kittensGeneration",1,15);
			} else {
				kittens = Utilities.readKittensFromDisk("kittensGeneration",gen,gen);
			}
			for(var x = totalCatCount-10000; x <totalCatCount; x++){
			  kittens.push(x);
			}
			return kittens;

		}

		return splitText;
	}
	function BreedingPair(id1, id2, score){
		this.id1 = id1;
		this.id2 = id2;
		this.score = score;
	}
	self.loadPairs = function(){
		let text = fs.readFileSync(__dirname + '/../kitten_pairs/saved_breeding_pairs.txt', 'utf8');
			let splitText = text.split("END,");
			var pairs = [];
			for(var textEntry in splitText){
				newSplit = splitText[textEntry].split(",");
				bp = new BreedingPair(newSplit[0],newSplit[1],newSplit[2]);
				pairs.push(bp);
				console.log(bp);
			}
		return pairs;
	}
	return self;
}

module.exports = KittenLoader;
