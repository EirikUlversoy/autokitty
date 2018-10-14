var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");
var mutationDicts = require("../core-modules/mutation-dictionary/MutationDictionaries")().setupDictionaries();
//Other modules from this repository
var GeneDecoder = require("../core-modules/genedecoder/GeneDecoder")();

function sendCats(){
	var config = require('../helpers/config/config');
	self = {};

	//Different IPC location on linux and Windows
	if (os.platform() == "linux") {
		var web3 = new Web3(new Web3.providers.IpcProvider('/root/.ethereum/geth.ipc', net));
	} else {
		var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net));
	}

	var Utilities = require("../helpers/utilities/Utility");

	var ck_contract = new web3.eth.Contract(config.kitty_core_abi,config.cryptokitties_contract_address);

	web3.eth.defaultAccount = config.owner_wallet_address;

	args = process.argv;

	function startSendingCats(cats){
		if(args[4] != undefined){
			config.send_cats_address = args[4];
		}
		for(var catToSend in cats){
			catToSend = cats[catToSend].id;
			gas_in_gwei = 14;
			console.log("trying to send: " + catToSend);
	    	ck_contract.methods.transfer(config.send_cats_address, parseInt(catToSend)).send({from: web3.eth.defaultAccount, gas: 100000, gasPrice: gas_in_gwei*1000000000});
		}
	}

	async function main(){
		var kittenLoader = require("../core-modules/kitten-loader/KittenLoader")(args)
		let cats = await kittenLoader.loadKittens(ck_contract)
		startSendingCats(cats)
	}




	self.start = function(){
		main();
	}


	return self;
}

module.exports = {sendCats}