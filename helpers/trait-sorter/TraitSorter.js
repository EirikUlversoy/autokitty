var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");
var mutationDicts = require("../../core-modules/mutation-dictionary/MutationDictionaries")().setupDictionaries();
//Other modules from this repository
var GeneDecoder = require("../../core-modules/genedecoder/GeneDecoder")();

function TraitSorter(optional_arguments){
	var config = require('../config/config');
	self = {};

	//Different IPC location on linux and Windows
	if (os.platform() == "linux") {
		var web3 = new Web3(new Web3.providers.IpcProvider('/root/.ethereum/geth.ipc', net));
	} else {
		var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net));
	}

	var Utilities = require("../utilities/Utility");




	var ck_contract = new web3.eth.Contract(config.kitty_core_abi,config.cryptokitties_contract_address);

	web3.eth.defaultAccount = config.owner_wallet_address;

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
			fs.writeFile(__dirname + '/../traitsorted_kittensv3/' + name + '.txt', output, (err) => {
		  	if (err) throw err;
		  	console.log('Saved R1+ of trait: ' + name + '!');
		});
	}

	function saveKittenIdsGEN(kittens, name){
			output = [];
			for (var kitten in kittens){
				output.push(kittens[kitten].id);
			}
			fs.appendFile(__dirname + '/../generation-archive/' + name + '.txt', output + ',', (err) => {
		  	if (err) throw err;
		  	console.log('Saved gen archive: ' + name + '!');
		});
	}

	function outputAllGenerations(cats){
		let cats_dictionary = {}
		for(let x = 0; x < 26; x++){
			genfiltered_cats = Utilities.separateByGeneration(cats, x, x)
			saveKittenIdsGEN(genfiltered_cats, x)
		}
	}
	function sortAllTraits(cats){
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

	async function main(optional_arguments){
		if(optional_arguments != undefined){
			args = optional_arguments
		}
		var kittenLoader = require("../../core-modules/kitten-loader/KittenLoader")(args);

		if(args[2] == "trait-sorter"){
			var cats = await kittenLoader.loadKittens(ck_contract)
			sortAllTraits(cats)

		} else if (args[2] == "generation-outputter"){
			var cats = await kittenLoader.loadKittens(ck_contract)			
			outputAllGenerations(cats)
		}
	}




	self.start = function(optional_arguments){
		main(optional_arguments);
	}


	return self;
}

module.exports = TraitSorter;