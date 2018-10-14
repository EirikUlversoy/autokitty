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

function showMutations(){
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


	args = process.argv;
	console.log(args)

	//Performs all mutations of a given generation. (Typically all gen 2 mutations from gen 1)
	function analyzePossibleMutations(cats){
		gen = parseInt(args[3],10);
		excludeReady = args[4] || false
		//var Breeder = require("../breeder")(config.upper_wallet_address, web3,ck_contract);
		//Breeder.setupBreedingOptions(cats, targeted_traits, unchained, sixPercent, cats[0].generation, cats[0].generation);
		if(gen != 99){
			cats = Utilities.separateByGeneration(cats, gen, gen);
		}
		if(!excludeReady){
			cats = Utilities.isReadyFilter(cats);
		}

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

	async function analyze(){
		var kittenLoader = require("../core-modules/kitten-loader/KittenLoader")(args);
		cats = await kittenLoader.loadKittens(ck_contract)
		analyzePossibleMutations(cats)
	}

	self.start = function(){
		analyze()
	}


	return self;

}

module.exports = { showMutations }