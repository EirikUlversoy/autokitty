var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");

//Other modules from this repository
var GeneDecoder = require("../genedecoder")();
var Utilities = require("../utilities");
var mutationDicts = require("../mutation-dictionary-module")().setupDictionaries();
var config = require('../config-module');
var generations_breeding_upper_limit = 25;

function SimpleMutationModule(){
	//BreedingPair "class"
	self = {};
	function BreedingPair(id1, id2, score){
		this.id1 = id1;
		this.id2 = id2;
		this.score = score;
	}

	//Different IPC location on linux and Windows
	if (os.platform() == "linux") {
		var web3 = new Web3(new Web3.providers.IpcProvider('/root/.ethereum/geth.ipc', net));
	} else {
		var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net));
	}

	//Load contract according to the config file
	var ck_contract = new web3.eth.Contract(config.kitty_core_abi,config.cryptokitties_contract_address);

	//Breeder module import
	var Breeder = require("../breeder")(config.upper_wallet_address, web3,ck_contract);

	web3.eth.defaultAccount = config.owner_wallet_address;

	//List of cats
	var cats = [];

	function addKittenToCatsList(id, kitten){
		kitten.id = id;
		kitten.chanceOfTrait = {};
		if(kitten.genes){
			if(!Utilities.contains(cats, kitten)){
				cats.push(kitten);
			}
		}
		return kitten;

	}

	//Read in arguments. The script takes up to 3 arguments. Typically "mode" "generation" "-brisk"(true/false)
	args = process.argv;

	//Performs all mutations of a given generation. (Typically all gen 2 mutations from gen 1)
	function performAllMutations(){
		gen = parseInt(args[3],10);
		let MutationMappings = {};
		if(gen == 0){
			MutationMappings = mutationDicts[0];
		} else if (gen == 1) {
			MutationMappings = mutationDicts[1];
		} else if(gen == 2){
			MutationMappings = mutationDicts[2];
		} else if(gen == 3){
			MutationMappings = mutationDicts[3];
		} else {
			//Default as tier 2 mutations
			MutationMappings = mutationDicts[1];

		}

		
		delete MutationMappings['Manx'];
		delete MutationMappings['Unicorn'];
		delete MutationMappings['Neckbeard'];
		delete MutationMappings['Babypuke'];
		delete MutationMappings['Buzzed'];
		delete MutationMappings['Fox']
		delete MutationMappings['Oasis']
		delete MutationMappings['Autumnmoon']
		
		

		console.log(MutationMappings);
		targeted_traits = ["Jaguar","Lemonade"];

		console.log("Performing: ALL mutations");
		var Breeder = require("../breeder")(config.upper_wallet_address, web3,ck_contract);
		var unchained = undefined;
		var sixPercent = undefined;
		Breeder.setupBreedingOptions(cats, targeted_traits, unchained, sixPercent, gen, gen);
		cats = Utilities.separateByGeneration(cats, gen, gen);
		cats = Utilities.isReadyFilter(cats);
		var mutaDict = GeneDecoder.analyzePossibleMutations(cats, MutationMappings, 3);
		console.log(mutaDict);

		var mutaKeys = Object.keys(mutaDict);
		listOfSecondaryMutations = [];
		for(var mutaKey in mutaKeys){
			key = mutaKeys[mutaKey];
			if(mutaDict[key] > 0 && mutaDict[key] < 45){
				listOfSecondaryMutations.push([key,mutaDict[key]]);
			}
		}

		listOfSecondaryMutations.sort(function(a,b) {return (a[1] > b[1]) ? 1 : ((b[1] > a[1]) ? -1 : 0);} );


		console.log("Going to breed these mutations, last chance to cancel: ");
		console.log(listOfSecondaryMutations);

		if(args[4] != undefined){
			Breeder.toggleSwift(parseInt(args[4],10));
		}

		function wrappedBreeder(cats, targeted_traits, unchained, sixPercent, gen){
			Breeder.setupBreedingOptions(cats, targeted_traits, unchained, sixPercent, gen, gen, undefined);
			Breeder.advancedBreedingLoop();
		}

		for(var secondaryMutationTarget in listOfSecondaryMutations){
			sMT = listOfSecondaryMutations[secondaryMutationTarget][0];
			console.log(sMT);

			//Breeder.setupBreedingOptions(cats, chosenDict[sMT], unchained, sixPercent, gen, gen);
			setTimeout(wrappedBreeder,  secondaryMutationTarget*30000, cats, MutationMappings[sMT], unchained, sixPercent, gen);

		}
	};

	function performAllMutationsImproved(totalCats){
		gen = parseInt(args[3],10);
		let MutationMappings = {};
		if(gen == 0){
			MutationMappings = mutationDicts[0];
		} else if (gen == 1) {
			MutationMappings = mutationDicts[1];
		} else if(gen == 2){
			MutationMappings = mutationDicts[2];
		} else if(gen == 3){
			MutationMappings = mutationDicts[3];
		} else {
			//Default as tier 2 mutations
			MutationMappings = mutationDicts[1];

		}

		
		delete MutationMappings['Manx'];
		delete MutationMappings['Unicorn'];
		delete MutationMappings['Neckbeard'];
		delete MutationMappings['Babypuke'];
		delete MutationMappings['Buzzed'];
		delete MutationMappings['Fox']
		delete MutationMappings['Oasis']
		delete MutationMappings['Autumnmoon']
		
		

		console.log(MutationMappings);
		targeted_traits = ["Jaguar","Lemonade"];

		console.log("Performing: ALL mutations");
		var Breeder = require("../breeder")(config.upper_wallet_address, web3,ck_contract);
		var unchained = undefined;
		var sixPercent = undefined;
		Breeder.setupBreedingOptions(totalCats, targeted_traits, unchained, sixPercent, gen, gen);
		totalCats = Utilities.separateByGeneration(totalCats, gen, gen);
		totalCats = Utilities.isReadyFilter(totalCats);
		var mutaDict = GeneDecoder.analyzePossibleMutations(totalCats, MutationMappings, 3);
		console.log(mutaDict);

		var mutaKeys = Object.keys(mutaDict);
		listOfSecondaryMutations = [];
		for(var mutaKey in mutaKeys){
			key = mutaKeys[mutaKey];
			if(mutaDict[key] > 0 && mutaDict[key] < 45){
				listOfSecondaryMutations.push([key,mutaDict[key]]);
			}
		}

		listOfSecondaryMutations.sort(function(a,b) {return (a[1] > b[1]) ? 1 : ((b[1] > a[1]) ? -1 : 0);} );


		console.log("Going to breed these mutations, last chance to cancel: ");
		console.log(listOfSecondaryMutations);

		if(args[4] != undefined){
			Breeder.toggleSwift(parseInt(args[4],10));
		}

		function wrappedBreeder(cats, targeted_traits, unchained, sixPercent, gen){
			Breeder.setupBreedingOptions(cats, targeted_traits, unchained, sixPercent, gen, gen, undefined);
			Breeder.advancedBreedingLoop();
		}

		for(var secondaryMutationTarget in listOfSecondaryMutations){
			sMT = listOfSecondaryMutations[secondaryMutationTarget][0];
			console.log(sMT);

			//Breeder.setupBreedingOptions(cats, chosenDict[sMT], unchained, sixPercent, gen, gen);
			setTimeout(wrappedBreeder,  secondaryMutationTarget*30000, totalCats, MutationMappings[sMT], unchained, sixPercent, gen);

		}
	};
	//Performs a single mutation. Unchained and sixPercent are deprecated
	function performOneMutation(){

		//Performing all configuration related to the mutation
		gen = parseInt(args[4], 10);
		let MutationMappings = {};
		if(gen > 0){
			MutationMappings = mutationDicts[1];
		} else {
			MutationMappings = mutationDicts[0];
		}
		if(args[6] == "T1"){
			MutationMappings = mutationDicts[0];
		}
		targeted_traits = MutationMappings[args[3]];

		console.log("In try one");
		var Breeder = require("../breeder")(config.upper_wallet_address, web3,ck_contract);

		if(args[5] != undefined){
			Breeder.toggleSwift(parseInt(args[5],10));
		}

		//Setting up breeding options and starting the breeding process
		var unchained = undefined;
		var sixPercent = undefined;
		var brisk = undefined;
		Breeder.setupBreedingOptions(cats, targeted_traits, unchained, sixPercent, gen, gen, brisk);
		Breeder.advancedBreedingLoop();
	};

	function performOneMutationImproved(totalCats){

		//Performing all configuration related to the mutation
		gen = parseInt(args[4], 10);
		let MutationMappings = {};
		if(gen > 0){
			MutationMappings = mutationDicts[1];
		} else {
			MutationMappings = mutationDicts[0];
		}
		if(args[6] == "T1"){
			MutationMappings = mutationDicts[0];
		}
		targeted_traits = MutationMappings[args[3]];

		console.log("In try one");
		var Breeder = require("../breeder")(config.upper_wallet_address, web3,ck_contract);

		if(args[5] != undefined){
			Breeder.toggleSwift(parseInt(args[5],10));
		}

		//Setting up breeding options and starting the breeding process
		var unchained = undefined;
		var sixPercent = undefined;
		var brisk = undefined;
		Breeder.setupBreedingOptions(totalCats, targeted_traits, unchained, sixPercent, gen, gen, brisk);
		Breeder.advancedBreedingLoop();
	};

	//The function that starts off the process that will perform either all or just one mutation
	function startMutationProcess(){
		//These two dictionaries are used for mutation mappings. Taken from their own module.
		let PremierMutations = mutationDicts[0];
		let SecondaryMutations = mutationDicts[1];

		console.log("is in main");

		//If Brisk is set the pair is only bred if at least one of the two cats have a brisk cooldown.
		var brisk = false;
		var gen = 0;
		var chosenDict = undefined;

		console.log("Looking for " + args[3] + "!");
		console.log("There are " + cats.length + " cats in the list!");
		console.log("There are " + allFilteredCats.length + " cats in the filtered list!");
		
		if(args[5] == "-brisk"){
			brisk = true;
		}
		if(args[2] == "all-mutations"){
			performAllMutations();
		}
		if (args[2] == "one-mutation")  {
			performOneMutation();
		}

	}

	function startMutationProcessImproved(totalCats){
		//These two dictionaries are used for mutation mappings. Taken from their own module.
		let PremierMutations = mutationDicts[0];
		let SecondaryMutations = mutationDicts[1];

		console.log("is in main");
		console.log(totalCats)
		//If Brisk is set the pair is only bred if at least one of the two cats have a brisk cooldown.
		var brisk = false;
		var gen = 0;
		var chosenDict = undefined;

		console.log("Looking for " + args[3] + "!");
		console.log("There are " + totalCats.length + " cats in the filtered list!");
		
		if(args[5] == "-brisk"){
			brisk = true;
		}
		if(args[2] == "all-mutations"){
			performAllMutationsImproved(totalCats);
		}
		if (args[2] == "one-mutation")  {
			performOneMutationImproved(totalCats);
		}

	}

	var allFilteredCats = [];
	//Pushes cats that match the user address into the filtered cats list. Needs to use the bind method in order to keep both cat ID and the address.
	function addKittenToOwnedCatsList(cat,address){
		if(address == config.upper_wallet_address){
			allFilteredCats.push(cat);
			console.log(cat);
		}

	}

	//Loop that checks for ownership of the cat
	function getOwnershipOfCatsFromContract(cats){
		console.log(cats);
		return cats.reduce(function(promise, cat) {
			return promise.then(function(){
				return ck_contract.methods.ownerOf(cat).call().then(addKittenToOwnedCatsList.bind(null, cat));
			});
		}, Promise.resolve());
	}

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
		console.log(actualValues)
		return actualValues
	}

	function getCatsFromContract(no_catArray){
		return allFilteredCats.reduce(function(promise, cat) {
			return promise.then(function(){
				return ck_contract.methods.getKitty(cat).call().then(addKittenToCatsList.bind(null, cat));
			});
		}, Promise.resolve());
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
		console.log(actualValues)
		return actualValues
	}

	async function mutateImproved(){
		if(args[2] == "load-pairs"){
			var kittenLoader = require("../kitten-loader")(args);
			var pairs = kittenLoader.loadPairs();
			breedOnly(pairs);
		} else {
			var kittenLoader = require("../kitten-loader")(args);
			const supply = await ck_contract.methods.totalSupply().call()
			const kittens = await kittenLoader.loadKittens(supply)
			const portionedCats = await Utilities.chunkify(kittens, kittens.length/5000);
			let totalCats = []
			for(let portionedCat in portionedCats){
				portionedCat = portionedCats[portionedCat]
				let ownedCats = await getOwnershipOfCatsLoopImproved(portionedCat)
				let actualCats = await getCatsLoopImproved(ownedCats)
				totalCats = totalCats.concat(actualCats)
			}
				

			startMutationProcessImproved(totalCats)
		}
	}
	function mutate(){
		cats = [];
		allFilteredCats = [];
		if(args[2] == "load-pairs"){
			var kittenLoader = require("../kitten-loader")(args);
			var pairs = kittenLoader.loadPairs();
			breedOnly(pairs);
		} else {
			var kittenLoader = require("../kitten-loader")(args);
			ck_contract.methods.totalSupply().call()
			.then(kittenLoader.loadKittens)
			.then(getOwnershipOfCatsFromContract)
			.then(getCatsFromContract)
			.then(startMutationProcess);
		}

	}

	function breedOnly(pairs){
		var Breeder = require("../breeder")(config.upper_wallet_address, web3,ck_contract);
		console.log(pairs.length);
		Breeder.directBreedFromInput(pairs);
	}

	
	//Amount of iterations and time inbetween. 10m often works well.
	

	self.start = function(){
		let timePerIteration = 600000;

		if(parseInt(config.time_per_iteration,10) != 0){
			timePerIteration = config.time_per_iteration;
		}
		for(v = 0; v <=400; v++){
			setTimeout(mutateImproved,timePerIteration*v);

			console.log("Scheduling: " + v);
		}

	}


	return self;

}

module.exports = SimpleMutationModule;
