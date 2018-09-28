var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");
var mutationDicts = require("../mutation-dictionary-module")().setupDictionaries();
//Other modules from this repository
var GeneDecoder = require("../genedecoder")();

function SendCatsModule(){
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
	var allFilteredCats = [];

	function doWork(id, kitten){
		console.log(kitten);
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

	function sendCats(){
		if(args[4] != undefined){
			config.send_cats_address = args[4];
		}
		for(var catToSend in cats){
			catToSend = cats[catToSend].id;
			gas_in_gwei = 20;
			console.log("trying to send: " + catToSend);
	    	ck_contract.methods.transfer(config.send_cats_address, parseInt(catToSend)).send({from: web3.eth.defaultAccount, gas: 100000, gasPrice: gas_in_gwei*1000000000});
		}
	}

	//Pushes cats that match the user address into the filtered cats list. Needs to use the bind method in order to keep both cat ID and the address.
	function doFilterWork(cat,address){
		
		if(address == config.upper_wallet_address){
			allFilteredCats.push(cat);
		}

	}

	//Loop that checks for ownership of the cat
	function getOwnershipOfCatsFromContract(cats){
		console.log(cats);
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
		.then(sendCats);
	}




	self.start = function(){
		main();
	}


	return self;
}

module.exports = SendCatsModule;