var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");
var mutationDicts = require("../mutation-dictionary-module")().setupDictionaries();
//Other modules from this repository
var GeneDecoder = require("../genedecoder")();

function MakeFancyCatModule(){
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

	//Breeder module import
	var Breeder = require("../breeder")(config.upper_wallet_address, web3,ck_contract);

	web3.eth.defaultAccount = config.owner_wallet_address;
	//List of cats
	var cats = [];

	function handleKittensWithContract(kittens){
		var promiseArray = [];
		for (kitten in kittens){
			promiseArray[kitten] = ck_contract.methods.getKitty(kittens[kitten].id).call().then(doWork.bind(null, kittens[kitten].id));
		}

		return Promise.all(promiseArray);
	}

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
	function startFancyCatProcess(){

		var gen_from = parseInt(args[3],10);
		var gen_to = parseInt(args[4],10);
		var dominantCount = parseInt(args[5],10);

		//Add fancy combos here, todo: database?
		var fancy_dict = {};
		fancy_dict["Raspoutine"] = ["Belch","Nachocheez","Buzzed","Sandalwood"];
		fancy_dict["Boot"] = ["Wiley","Cerulian","Rollercoaster","Ganado"];
		fancy_dict["Swish"] = ["Norwegianforest", "Thicccbrowz", "Orangesoda","Luckystripe"];
		fancy_dict["Page"] = ["Rascal", "Wasntme","Peach"];
		fancy_dict["Lulu"] = ["Salty","Verdigris","Turtleback","Cyan"];
		fancy_dict["Catbury"] = ["Ragdoll", "Spock" , "Mintgreen" ,"Crazy", "Bananacream", "Chocolate", "Mintmacaron","Yokel"];
		fancy_dict["Purrspero"] = ["Googly","Beard","Royalpurple","Dippedcone"];
		fancy_dict["New"] = ["Redvelvet","Patrickstarfish","Dragontail"];
		fancy_dict["New2"] = ["Sphynx","Redvelvet","Dragontail"];
		fancy_dict["New3"] = ["Sphynx","Patrickstarfish","Dragontail","Redvelvet"];

		var targeted_traits = fancy_dict[args[6]]; 		
		var Fancyfier = require("../fancyfier")(config.upper_wallet_address, web3, ck_contract, targeted_traits, dominantCount);
		var stages = Fancyfier.mainStarter(gen_from, gen_to, cats);


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

	function fancify(){
		cats = [];
		allFilteredCats = [];
		var kittenLoader = require("kitten-loader")(args);
		ck_contract.methods.totalSupply().call()
		.then(kittenLoader.loadKittens)
		.then(getOwnershipOfCatsFromContract)
		.then(getCatsFromContract)
		.then(startFancyCatProcess);
	}




	self.start = function(){
		let timePerIteration = 400000;

		if(parseInt(config.time_per_iteration,10) != 0){
			timePerIteration = config.time_per_iteration;
		}
		for(v = 0; v <=400; v++){
			setTimeout(fancify,timePerIteration*v);

			console.log("Scheduling: " + v);
		}

	}


	return self;
}

module.exports = MakeFancyCatModule;