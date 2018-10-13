var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");

//Other modules from this repository
var GeneDecoder = require("../core-modules/genedecoder/GeneDecoder")();
var Utilities = require("../helpers/utilities/Utility");
var mutationDicts = require("../core-modules/mutation-dictionary-module/MutationDictionaries")().setupDictionaries();
var config = require('../helpers/config-module/config');
var generations_breeding_upper_limit = 25;

function loadPairs(){
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

	async function loadPairsAndBreed(){
		var kittenLoader = require("../core-modules/kitten-loader/KittenLoader")(args);
		var pairs = kittenLoader.loadPairs()
		breedOnly(pairs);
	}

	function breedOnly(pairs){
		var Breeder = require("../breeder")(config.upper_wallet_address, web3,ck_contract)
		Breeder.directBreedFromInput(pairs)
		console.log("bred " + pairs.length + "pairs")

	}

	
	//Amount of iterations and time inbetween. 10m often works well.
	

	self.start = function(){
		let timePerIteration = 600000;

		if(parseInt(config.time_per_iteration,10) != 0){
			timePerIteration = config.time_per_iteration;
		}
		for(v = 0; v <=400; v++){
			setTimeout(loadPairsAndBreed,timePerIteration*v);

			console.log("Scheduling: " + v);
		}

	}


	return self;

}

module.exports =  { loadPairs }
