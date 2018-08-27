var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");
var mutationDicts = require("../mutation-dictionary-module")().setupDictionaries();
//Other modules from this repository
var GeneDecoder = require("../genedecoder")();

function ListAuctionsModule(){
	var config = require('../config-module');
	self = {};

	//Different IPC location on linux and Windows
	if (os.platform() == "linux") {
		var web3 = new Web3(new Web3.providers.IpcProvider('/root/.ethereum/geth.ipc', net));
	} else {
		var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net));
	}

	var Utilities = require("../utilities");

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
	function listCats(){
		var price_from = String(args[4]);
		var price_to = String(args[5]);
		var Auctioneer = require('../auctioneer')(config.upper_wallet_address,web3, ck_contract, price_from, price_to);
		for(var cat in cats){
			catId = cats[cat].id;
			console.log("Trying to list: " + catId);
			Auctioneer.check(catId, config.upper_wallet_address);
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

	function main(){
		var kittenLoader = require("kitten-loader")(args);
		ck_contract.methods.totalSupply().call()
		.then(kittenLoader.loadKittens)
		.then(getOwnershipOfCatsFromContract)
		.then(getCatsFromContract)
		.then(listCats);
	}




	self.start = function(){
		main();
	}


	return self;
}

module.exports = ListAuctionsModule;