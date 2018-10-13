var Utilities = require('../../helpers/utilities/Utility');
var fs = require('fs');
function KittenLoader(args){
	var self = {};
	if(args != undefined){
		var args = args;
	} else {
		args = process.argv;
	}
	self.loadTraits = function(trait_filename){
		console.log("Loading the file called:");
		console.log(trait_filename);
		let text = fs.readFileSync(__dirname + '/../traits/' + trait_filename + '.txt', 'utf8');
		let splitText = text.split(",");
		console.log(splitText);
		return splitText;
	}
	self.loadKittens = async function(ck_contract){
		async function getOwnershipOfCatsLoopImproved(cats){
			async function doFilterWork(id, address){
				if(address === config.upper_wallet_address){
					return id
				} else {

				}
			}
			let promises = []
			function myFunction(retries, cat) {
					return ck_contract.methods.ownerOf(cat).call().then(doFilterWork.bind(null, cat)).catch( err => {
						return retries > 0 ? myFunction(retries-1, cat) : console.log(err.message) 
					})
			}
			cats.forEach( cat => {
				promises.push(myFunction(100, cat))
			})

			let actualValues = []
			let resolvedPromises = await Promise.all(promises)
			let actualData = await resolvedPromises.forEach((value) => {
				if(value != undefined){
					actualValues.push(value)
				}
			})
			return actualValues
		}

		async function getCatsLoopImproved(cat_array){
			async function doWork(id, kitten){
				kitten.id = id;
				kitten.chanceOfTrait = {};
				if(kitten.genes){
					return kitten
				}
			}
			let promises = []
			function myFunction(retries, cat) {
					return ck_contract.methods.getKitty(cat).call().then(doWork.bind(null, cat)).catch( err => {
						return retries > 0 ? myFunction(retries-1, cat) : console.log(err.message) 
					})
			}
			cat_array.forEach( cat => {
				promises.push(myFunction(100, cat))
			})

			let actualValues = []
			let resolvedPromises = await Promise.all(promises)
			let actualData = await resolvedPromises.forEach((value) => {
				if(value != undefined){
					actualValues.push(value)
				}
			})
			return actualValues
		}

		const supply = await ck_contract.methods.totalSupply().call()
		const kittens = await self.loadKittenIDs(supply)
		const portionedCats = await Utilities.chunkify(kittens, kittens.length/5000);
		let totalCats = []
		for(let portionedCat in portionedCats){
			portionedCat = portionedCats[portionedCat]
			let ownedCats = await getOwnershipOfCatsLoopImproved(portionedCat)
			let actualCats = await getCatsLoopImproved(ownedCats)
			totalCats = totalCats.concat(actualCats)
		}

		return totalCats
		
	}
	self.loadKittenIDs = function(totalCatCount){
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
			if(gen != 99) {
				var kittens = Utilities.readKittensFromDisk("kittensGeneration",gen,gen);
				for(var x = totalCatCount-5000; x < totalCatCount; x++){
					kittens.push(x);
				}
			} else {
				var kittens = Utilities.readKittensFromDisk("kittensGeneration",1,4);
				for(var x = totalCatCount-5000; x < totalCatCount; x++){
					kittens.push(x);
				}
			}

			return kittens;
		}
		if(args[2] == "make-fancy-cat"){
			var kittens = [];

			let from_gen = parseInt(args[3],10);
			let to_gen = parseInt(args[4],10);

			kittens = Utilities.readKittensFromDisk("kittensGeneration",from_gen,to_gen);
			if(args[7] == "SHORTLIST"){
				kittens = Utilities.fancyReadKittensFromDisk(args[6],from_gen,to_gen);
			}

			for(var x = totalCatCount-10000; x <totalCatCount; x++){
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

		if(args[2] == "trait-search" || args[2] == "trait-search-multiple" || args[2] == "fancy-filtering"){
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

		if(args[2] == "trait-sorter"){
			let gen = parseInt(args[3],10);
			let kittens = [];

			if(gen == 99){
				kittens = Utilities.readKittensFromDisk("kittensGeneration",3,7);
			} else {
				kittens = Utilities.readKittensFromDisk("kittensGeneration",gen,gen);
			}
			for(var x = totalCatCount-10000; x <totalCatCount; x++){
				kittens.push(x);
			}
			return kittens;
		}

		if(args[2] == "make-fancy-catX"){
			let filename = args[3]
			let gen = parseInt(args[4],10)
			let gen_max = parseInt(args[5],10)
			traits = self.loadTraits(filename)
			kittens = []
			for(let trait in traits){
				trait = traits[trait]
				kittens = kittens.concat(Utilities.fancyReadKittensFromDiskX(trait,gen,gen_max))
			}
			for(var x = totalCatCount-4000; x <totalCatCount; x++){
				kittens.push(x);
			}
			console.log("Amount of kittens: " + kittens.length);
			return kittens;
		}

		if(args[2] == "generation-outputter"){
			let kittens = []

			for(var x = 800000; x < totalCatCount; x++){
				kittens.push(x)
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
