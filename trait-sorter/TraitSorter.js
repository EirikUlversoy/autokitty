var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");
var mutationDicts = require("../mutation-dictionary-module")().setupDictionaries();
//Other modules from this repository
var GeneDecoder = require("../genedecoder")();

function TraitSorter(optional_arguments){
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
	if(optional_arguments != undefined){
		args = optional_arguments
	} else {
		args = process.argv;
	}
	console.log(optional_arguments)

	function saveKittenIds(kittens, name){
			output = [];
			for (var kitten in kittens){
				output.push(kittens[kitten].id);
			}
			fs.writeFile(__dirname + '/../traitsorted_kittensv2/' + name + '.txt', output, (err) => {
		  	if (err) throw err;
		  	console.log('Saved R1+ of trait: ' + name + '!');
		});
	}

	function sortAllTraits(){
		var kittenLoader = require("kitten-loader")(args);
		
		cats_dictionary = {}
		traitList = []
		for (let [key, value] of Object.entries(GeneDecoder.allGeneGroups)){
			console.log("Going through the " + key + " category!")
			for(let [sKey, sValue] of Object.entries(GeneDecoder.allGeneGroups[key])){
				console.log("Looking at the " + sKey + " trait!")
				traitList.push(sKey)
 
			}
		}

		traitCats = GeneDecoder.filterAllTraitsR1(cats, traitList)

		for (let [key, value] of Object.entries(traitCats)){
			for(let x = 0; x<26; x++){
				genfiltered_cats = Utilities.separateByGeneration(value, x, x)
				saveKittenIds(genfiltered_cats, key+x)
			}
		}
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


	function main(optional_arguments){
		if(optional_arguments != undefined){
			args = optional_arguments
		}
		if(args[2] == "trait-sorter"){
			var kittenLoader = require("kitten-loader")(args);
			ck_contract.methods.totalSupply().call()
			.then(kittenLoader.loadKittens)
			.then(getOwnershipOfCatsFromContract)
			.then(getCatsFromContract)
			.then(sortAllTraits);

		}
	}




	self.start = function(optional_arguments){
		main(optional_arguments);
	}


	return self;
}

module.exports = TraitSorter;