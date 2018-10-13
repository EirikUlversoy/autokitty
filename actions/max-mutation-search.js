var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");
var mutationDicts = require("../core-modules/mutation-dictionary/MutationDictionaries")().setupDictionaries();
//Other modules from this repository
var GeneDecoder = require("../core-modules/genedecoder/GeneDecoder")();
var Utilities = require("../helpers/utilities/Utility");
var config = require("../helpers/config/config");

function maxMutationSearch(){
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

	//Read in arguments. The script takes up to 3 arguments. Typically "mode" "generation" "-brisk"(true/false)
	const args = process.argv;
	console.log(args);

	//Where most of the script logic is.
	function startPureMutationProcess (cats) {
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
		var Breeder = require("../core-modules/breeder/Breeder")(config.upper_wallet_address, web3,ck_contract);
		Breeder.setupBreedingOptions(cats, targeted_traits, unchained, sixPercent, gen, gen);
		Breeder.togglePureMuta(mutaCount);
		Breeder.advancedBreedingLoop();

	}

	var allFilteredCats = [];
	
	self.start = function (){
		mutate();

	}

	async function mutate(){

		var kittenLoader = require("../core-modules/kitten-loader/KittenLoader")(args);
		let cats = await kittenLoader.loadKittens(ck_contract)
		startPureMutationProcess(cats)
		
	}

	return self;

}

module.exports = { maxMutationSearch };


