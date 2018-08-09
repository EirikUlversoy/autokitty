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

function ShowAvailableMutationsModule(){
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

	args = process.argv;

	//Performs all mutations of a given generation. (Typically all gen 2 mutations from gen 1)
	function analyzePossibleMutations(){
		gen = parseInt(args[3],10);
		//var Breeder = require("../breeder")(config.upper_wallet_address, web3,ck_contract);
		//Breeder.setupBreedingOptions(cats, targeted_traits, unchained, sixPercent, cats[0].generation, cats[0].generation);
		cats = Utilities.separateByGeneration(cats, gen, gen);
		cats = Utilities.isReadyFilter(cats);
		if(gen == 0){
			console.log("Dominant:");
			var mutaDict = GeneDecoder.analyzePossibleMutations(cats, mutationDicts[0], 3);
			console.log(mutaDict);

			console.log("R1:");
			var mutaDict = GeneDecoder.analyzePossibleMutations(cats, mutationDicts[0], 2);
			console.log(mutaDict);
			
			console.log("R2:");
			var mutaDict = GeneDecoder.analyzePossibleMutations(cats, mutationDicts[0], 1);
			console.log(mutaDict);
			
			console.log("R3:");
			var mutaDict = GeneDecoder.analyzePossibleMutations(cats, mutationDicts[0], 0);
			console.log(mutaDict);
			
		} else {
			console.log("Generation above 0, only looking at dominant genes");
			var mutaDict = GeneDecoder.analyzePossibleMutations(cats, mutationDicts[1], 3);
			console.log(mutaDict);
		}
	};

	var allFilteredCats = [];
	//Pushes cats that match the user address into the filtered cats list. Needs to use the bind method in order to keep both cat ID and the address.
	function addKittenToOwnedCatsList(cat,address){
		if(address == config.upper_wallet_address){
			allFilteredCats.push(cat);
		}

	}

	//Loop that checks for ownership of the cat
	function getOwnershipOfCatsFromContract(cats){
		return cats.reduce(function(promise, cat) {
			return promise.then(function(){
				return ck_contract.methods.ownerOf(cat).call().then(addKittenToOwnedCatsList.bind(null, cat));
			});
		}, Promise.resolve());
	}


	function getCatsFromContract(no_catArray){
		return allFilteredCats.reduce(function(promise, cat) {
			return promise.then(function(){
				return ck_contract.methods.getKitty(cat).call().then(addKittenToCatsList.bind(null, cat));
			});
		}, Promise.resolve());
	}




	function analyze(){
		var kittenLoader = require("kitten-loader")(args);
		ck_contract.methods.totalSupply().call()
		.then(kittenLoader.loadKittens)
		.then(getOwnershipOfCatsFromContract)
		.then(getCatsFromContract)
		.then(analyzePossibleMutations);
	}

	self.start = function(){
		let timePerIteration = 600000;

		if(parseInt(config.time_per_iteration,10) != 0){
			timePerIteration = config.time_per_iteration;
		}
		for(v = 0; v <=400; v++){
			setTimeout(analyze,timePerIteration*v);

			console.log("Scheduling: " + v);
		}

	}


	return self;

}

module.exports = ShowAvailableMutationsModule;