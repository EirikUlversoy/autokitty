var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");
var mutationDicts = require("../mutation-dictionary-module")().setupDictionaries();
//Other modules from this repository
var GeneDecoder = require("../genedecoder")();
var Utilities = require("../utilities");
var config = require("../config-module");

function PureMutationModule(){
	self = {};

	function BreedingPair(id1, id2, score){
		this.id1 = id1;
		this.id2 = id2;
		this.score = score;
	}

	var generations_breeding_upper_limit = 25;
	//Different IPC location on linux and Windows
	if (os.platform() == "linux") {
		var web3 = new Web3(new Web3.providers.IpcProvider('/root/.ethereum/geth.ipc', net));
	} else {
		var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net));
	}

	var ck_contract = new web3.eth.Contract(config.kitty_core_abi,config.cryptokitties_contract_address);

	//Breeder module import

	web3.eth.defaultAccount = config.owner_wallet_address;

	//List of cats
	var cats = [];




	//Read in arguments. The script takes up to 3 arguments. Typically "mode" "generation" "-brisk"(true/false)
	const args = process.argv;
	console.log(args);

	//Where most of the script logic is.
	function startPureMutationProcess () {
		let PremierMutations = mutationDicts[0];
		let SecondaryMutations = mutationDicts[1];
		console.log("is in main");

		var targeted_traits = [];

		var brisk = false;
		var mutaCount = 0;
		var gen = 0;
		var unchained = false;
		var sixPercent = false;
		var chosenDict = undefined;

		console.log("Now trying to find pairs!");
		console.log("Looking for " + args[2] + "!");
		console.log("There are " + cats.length + " cats in the list!");
		console.log("There are " + allFilteredCats.length + " cats in the filtered list!");

		gen = parseInt(args[3],10);
		mutaCount = parseInt(args[4],10); 
		//Avoids conflicts
		targeted_traits = ["Jaguar","Lemonade"];
		console.log("In gen "+ gen + " pure muta");
		var Breeder = require("../breeder")(config.upper_wallet_address, web3,ck_contract);
		Breeder.setupBreedingOptions(cats, targeted_traits, unchained, sixPercent, gen, gen);
		Breeder.togglePureMuta(mutaCount);
		Breeder.advancedBreedingLoop();

	}

	var allFilteredCats = [];


	//Loop that checks for ownership of the cat
	function getOwnershipOfCatsFromContract(cats){
		//Pushes cats that match the user address into the filtered cats list. Needs to use the bind method in order to keep both cat ID and the address.
		function addCatToList(cat,address){
			if(address == config.upper_wallet_address){
				allFilteredCats.push(cat);
				console.log(cat);
			}

		}

		return cats.reduce(function(promise, cat) {
			return promise.then(function(){
				return ck_contract.methods.ownerOf(cat).call().then(addCatToList.bind(null, cat));
			});
		}, Promise.resolve());
	}


	function getCatsFromContract(no_catArray){
		function addCatToList(id, kitten){
			kitten.id = id;
			kitten.chanceOfTrait = {};
			if(kitten.genes){
				if(!Utilities.contains(cats, kitten)){
					cats.push(kitten);
				}
			}
			return kitten;

		}
		return allFilteredCats.reduce(function(promise, cat) {
			return promise.then(function(){
				return ck_contract.methods.getKitty(cat).call().then(addCatToList.bind(null, cat));
			});
		}, Promise.resolve());
	}

	

	self.start = function (){
		let timePerIteration = 3000000;

		if(parseInt(config.time_per_iteration,10) != 0){
			timePerIteration = config.time_per_iteration;
		}

		var offset = 0;
		for(v = 0; v <=400; v++){
			setTimeout(mutate,timePerIteration*v);

			console.log("Scheduling: " + v);
		}
	}

	function mutate(){

		var kittenLoader = require("kitten-loader")(args);
		ck_contract.methods.totalSupply().call()
		.then(kittenLoader.loadKittens)
		.then(getOwnershipOfCatsFromContract)
		.then(getCatsFromContract)
		.then(startPureMutationProcess);
		
	}

	return self;

}

module.exports = PureMutationModule;


