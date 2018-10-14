var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");
var mutationDicts = require("../core-modules/mutation-dictionary/MutationDictionaries")().setupDictionaries();
//Other modules from this repository
var GeneDecoder = require("../core-modules/genedecoder/GeneDecoder")();

function listAuctions(){
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
	//Where most of the script logic is.
	function listCats(cats){
		console.log(cats)
		var price_from = String(args[4]);
		var price_to = String(args[5]);
		var Auctioneer = require('../core-modules/auctioneer/Auctioneer')(config.upper_wallet_address,web3, ck_contract, price_from, price_to);
		for(var cat in cats){
			catId = cats[cat].id;
			console.log("Trying to list: " + catId);
			Auctioneer.check(catId, config.upper_wallet_address);
		}
	}



	

	async function main(){
		var kittenLoader = require("../core-modules/kitten-loader/KittenLoader")(args);
		let cats = await kittenLoader.loadKittens(ck_contract)
		listCats(cats)
	}




	self.start = function(){
		main();
	}


	return self;
}

module.exports = { listAuctions }