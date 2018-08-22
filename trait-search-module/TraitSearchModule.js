var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");
var mutationDicts = require("../mutation-dictionary-module")().setupDictionaries();
//Other modules from this repository
var GeneDecoder = require("../genedecoder")();

function TraitSearchModule(){
	var config = require('../config-module');
	self = {};

	//Different IPC location on linux and Windows
	if (os.platform() == "linux") {
		var web3 = new Web3(new Web3.providers.IpcProvider('/root/.ethereum/geth.ipc', net));
	} else {
		var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net));
	}

	var Utilities = require("utilities");




	var ck_contract = new web3.eth.Contract(config.kitty_core_abi,config.cryptokitties_contract_address);

	web3.eth.defaultAccount = config.owner_wallet_address;
	//List of cats
	var cats = [];

	function doWork(id, kitten){
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
	//Where most of the script logic is.
	function searchForTrait(){
		console.log(cats);
		var trait = args[3];
		var gen = parseInt(args[4],10);
		var cooldown = args[5];
		cats = GeneDecoder.newDiamondPrototypeFunction(cats,[trait], cooldown);
		for(var cat in cats){
			console.log(cats[cat]);
		}

		Utilities.saveKittenIds(cats, "t_search_results" + 0);
	}

	function searchForMultipleTraits(){
		var traitFileName = args[3];
		//get traits here
		var kittenLoader = require("kitten-loader")(args);
		targetedTraits = kittenLoader.loadTraits(traitFileName);
		console.log(targetedTraits);
		var gen = parseInt(args[4],10);
		var cooldown = args[5];
		var includeFancySet = (args[6] == 'true');
		var dominantOnlySet = (args[7] == 'true');
		cats = Utilities.separateByGeneration(cats, gen, gen);
		cats = GeneDecoder.findCatsWithTraitCombination(cats, targetedTraits, cooldown, dominantOnlySet);
		if(!includeFancySet){
			cats = GeneDecoder.filterOutFancies(cats, fancyTraitCombinations);
		}
		console.log("found: " + cats.length + "cats!");
		Utilities.saveKittenIds(cats, "t_search_results_multiple" + 0);
	}



	//Pushes cats that match the user address into the filtered cats list. Needs to use the bind method in order to keep both cat ID and the address.
	function doFilterWork(cat,address){
		if(address == config.upper_wallet_address){
			allFilteredCats.push(cat);
			console.log(cat);
		}

	}

	//Loop that checks for ownership of the cat
	function getOwnershipOfCatsFromContract(cats){
		return cats.reduce(function(promise, cat) {
			return promise.then(function(){
				return ck_contract.methods.ownerOf(cat).call().then(doFilterWork.bind(null, cat));
			});
		}, Promise.resolve());
	}




	var allFilteredCats = [];

	function getCatsFromContract(no_catArray){
		return allFilteredCats.reduce(function(promise, cat) {
			return promise.then(function(){
				return ck_contract.methods.getKitty(cat).call().then(doWork.bind(null, cat));
			});
		}, Promise.resolve());
	}

	function BreedingPair(id1, id2, score){
		this.id1 = id1;
		this.id2 = id2;
		this.score = score;
	}

	function main(){
		if(args[2] == "trait-search-multiple"){
			var kittenLoader = require("kitten-loader")(args);
			ck_contract.methods.totalSupply().call()
			.then(kittenLoader.loadKittens)
			.then(getOwnershipOfCatsFromContract)
			.then(getCatsFromContract)
			.then(searchForMultipleTraits);
		} else {
			var kittenLoader = require("kitten-loader")(args);
			ck_contract.methods.totalSupply().call()
			.then(kittenLoader.loadKittens)
			.then(getOwnershipOfCatsFromContract)
			.then(getCatsFromContract)
			.then(searchForTrait);
		}

	}




	self.start = function(){
		main();
	}


	return self;
}

module.exports = TraitSearchModule;