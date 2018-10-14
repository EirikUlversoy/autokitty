var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");

//Other modules from this repository
var GeneDecoder = require("../core-modules/genedecoder/GeneDecoder")();
var Utilities = require("../helpers/utilities/Utility");
var mutationDicts = require("../core-modules/mutation-dictionary/MutationDictionaries")().setupDictionaries();
var config = require('../helpers/config/config');
var generations_breeding_upper_limit = 25;

function mutateOne(){
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
	var Breeder = require("../core-modules/breeder/Breeder")(config.upper_wallet_address, web3,ck_contract);

	web3.eth.defaultAccount = config.owner_wallet_address;

	//Read in arguments. The script takes up to 3 arguments. Typically "mode" "generation" "-brisk"(true/false)
	args = process.argv;

	//Performs a single mutation. Unchained and sixPercent are deprecated
	function performOneMutation(totalCats){
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
		var Breeder = require("../core-modules/breeder/Breeder")(config.upper_wallet_address, web3,ck_contract);

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
	function startMutationProcess(totalCats){
		//These two dictionaries are used for mutation mappings. Taken from their own module.
		let PremierMutations = mutationDicts[0];
		let SecondaryMutations = mutationDicts[1];

		//If Brisk is set the pair is only bred if at least one of the two cats have a brisk cooldown.
		var brisk = false;
		var gen = 0;
		var chosenDict = undefined;

		console.log("Looking for " + args[3] + "!");
		console.log("There are " + totalCats.length + " cats in the filtered list!");
		
		if(args[5] == "-brisk"){
			brisk = true;
		}

		performOneMutation(totalCats);

	}


	async function mutate(){
		var kittenLoader = require("../core-modules/kitten-loader/KittenLoader")(args);
		var cats = await kittenLoader.loadKittens(ck_contract)
		startMutationProcess(cats)	
	}

	
	//Amount of iterations and time inbetween. 10m often works well.
	

	self.start = function(){
		let timePerIteration = 600000;

		if(parseInt(config.time_per_iteration,10) != 0){
			timePerIteration = config.time_per_iteration;
		}
		for(v = 0; v <=400; v++){
			setTimeout(mutate,timePerIteration*v);

			console.log("Scheduling: " + v);
		}

	}


	return self;

}

module.exports =  { mutateOne }
