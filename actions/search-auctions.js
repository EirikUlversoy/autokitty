var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");
var mutationDicts = require("../mutation-dictionary-module")().setupDictionaries();
//Other modules from this repository
var GeneDecoder = require("../genedecoder")();
var Utilities = require("../utilities");
var config = require("../config-module");

function SearchAuctionsModule(){
	self = {};
	var args = process.argv;
	console.log(args)
	//Different IPC location on linux and Windows
	if (os.platform() == "linux") {
		var web3 = new Web3(new Web3.providers.IpcProvider('/root/.ethereum/geth.ipc', net));
	} else {
		var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net));
	}

	var sale_contract = new web3.eth.Contract(config.kitty_sales_abi, config.sale_contract_address);

	var ck_contract = new web3.eth.Contract(config.kitty_core_abi,config.cryptokitties_contract_address);

	//Single cat API call template for illustration
	web3.eth.defaultAccount = config.owner_wallet_address;

	//List of cats
	var cats = [];

	//Variables used for buying from kitty clock (and potentially other auctions)
	var allFilteredAuctions = [];
	var allFilteredCatsB = [];
	var allFilteredCatsC = [];
	var allFilteredCatsD = [];
	var prices = {};
	var desired_traits_dictionary = {};

	//Gets ownerof Address first, then checks if the cat is for sale
	function getCatsForSaleFromContract(cats){
		console.log("adding cats for sale (STEP 1)")
		//If the owner address is the sale contract address, this cat is for sale so push it to filtered cats
		function addCatToList(cat,address){
			if(address == config.sale_contract_address){
				allFilteredCatsB.push(cat);
				console.log(cat)
			}
		}
		return cats.reduce(function(promise, cat) {
			return promise.then(function(){
				return ck_contract.methods.ownerOf(cat).call().then(addCatToList.bind(null, cat));
			});
		}, Promise.resolve());
	}

	//Reads kitten ids from disk instead of using GETH to find them
	//Each mode requires different files etc.

	var allFilteredCats = [];

	function getCatsFromContract(no_catArray){
		console.log("adding cats (STEP2)")
		//Pushes cats that match the user address into the filtered cats list. Needs to use the bind method in order to keep both cat ID and the address.
		function addCatToListN(id, kitten){
			//if(address == config.sale_contract_address){
			kitten.id = id;
			kitten.chanceOfTrait = {};

			allFilteredCatsC.push(kitten);
			//}

		}
		return allFilteredCatsB.reduce(function(promise, cat) {
			return promise.then(function(){
				return ck_contract.methods.getKitty(cat).call().then(addCatToListN.bind(null, cat));
			});
		}, Promise.resolve());
	}

	function CatWithPrice(id, price, missingTraits){
		this.id = id;
		this.price = price;
		this.missingTraits = missingTraits;
	}

	function orderByPrice(catDictionary){
		var ids = Object.keys(catDictionary);
		var arrayOfPricedCats = [];
		console.log(catDictionary)
		for(var id in ids){
			id = ids[id];
			arrayOfPricedCats.push(new CatWithPrice(id, catDictionary[id][1], ""));
			//arrayOfScoredCats.push(scores[key]);
		}
		var Comparators = require('../ak-comparators')
		arrayOfPricedCats.sort(Comparators.keyComparator("price")).reverse();

		return arrayOfPricedCats;

	}

	function searchAuctions(kittenTotal){
		var traits = []
		var gen_from = parseInt(args[3],10)
		var gen_to = parseInt(args[4],10)
		var file = args[5]
		if(file === "file"){
			var traits_filename = args[6];
			if(traits_filename != undefined){
				KittenLoader = require('kitten-loader')();
				traits = KittenLoader.loadTraits(traits_filename);
			}
		} else {
			traits = [args[7]]
		}
		var justCatDictionary = {}
		for(var justCat in allFilteredCatsC){
			justCat = allFilteredCatsC[justCat]
			justCatDictionary[justCat.id] = justCat
		}
		let suitableKittens = GeneDecoder.findCatsWithTraitCombination(allFilteredCatsC, traits, 99, true);

		if(gen_from != 99 && gen_to != 99){
			suitableKittens = Utilities.separateByGeneration(suitableKittens,gen_from, gen_to)
		}
		var catAndAuctionDictionary = {}
		for(var suitableKitten in suitableKittens){
			suitableKitten = suitableKittens[suitableKitten]
			catAndAuctionDictionary[suitableKitten.id] = [suitableKitten,prices[suitableKitten.id]]
		}

		let orderedList = orderByPrice(catAndAuctionDictionary)
		console.log(orderedList)
		
	}
	function getAllPricesFromContract(no_cats){
		console.log("adding prices (STEP3)")
		function addCatToList(id, price){
			prices[id] = web3.utils.fromWei(price, "ether")
			allFilteredCatsD.push([price, id])
		}

		return allFilteredCatsB.reduce(function(promise, cat) {
			return promise.then(function(){
				return sale_contract.methods.getCurrentPrice(cat).call().then(addCatToList.bind(null, cat));
			});
		}, Promise.resolve());

	}
	function getClockOwnershipOfCatsFromContract(no_cats){
		//If the seller address is the CK contract address this is a clock cat, so push it to filtered cats (for clock cats)
		function addCatToListO(cat,address){
			if(address['seller'] == config.cryptokitties_contract_address){
				allFilteredCatsB.push(cat);
				
			}
		}

		return allFilteredCats.reduce(function(promise, cat) {
			return promise.then(function(){
				return sale_contract.methods.getAuction(cat).call().then(addCatToListO.bind(null, cat));
			});
		}, Promise.resolve());


	}

	function initCatList(total){
		var kittens = [];
		for(var x = 1; x < total; x++){
			kittens.push(x);
		}
		return kittens;
	}

	self.start = function(){
		ck_contract.methods.totalSupply().call()
		.then(initCatList)
		.then(getCatsForSaleFromContract)
		//.then(getClockOwnershipOfCatsFromContract)
		.then(getCatsFromContract)
		.then(getAllPricesFromContract)
		.then(searchAuctions);
	}
	
	return self;
}

module.exports = SearchAuctionsModule;