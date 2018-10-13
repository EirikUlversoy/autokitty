var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");
var mutationDicts = require("../core-modules/mutation-dictionary-module/MutationDictionaries")().setupDictionaries();
//Other modules from this repository
var GeneDecoder = require("../core-modules/genedecoder/GeneDecoder")();

function makeFancyCat(){
	var config = require('../helpers/config/config');
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


	args = process.argv;
	//Where most of the script logic is.
	function startFancyCatProcessX(cats){
		var gen_from = parseInt(args[4],10)
		var gen_to = parseInt(args[5],10)
		var dominantCount = parseInt(args[6],10);
		var kittenLoader = require("kitten-loader")(args);
		traits = kittenLoader.loadTraits(args[3]);
		var targeted_traits = traits;
		var Fancyfier = require("../fancyfier")(config.upper_wallet_address, web3, ck_contract, targeted_traits, dominantCount);
		var stages = Fancyfier.mainStarter(gen_from, gen_to, cats);

	}
	function startFancyCatProcess(cats){

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
		fancy_dict["Purrity"] = ["Selkirk","Cloudwhite","Chronic","Cheeky"];
		fancy_dict["Fancy-project-1"] = ["Walrus","Pearl","Avatar","Dioscuri"];
		fancy_dict["Fancy-project-2"] = ["Bornwithit","Sully","Shamrock","Lykoi"];

		fancy_dict["Fancy-project-3"] = ["Walrus","Pearl","Avatar","Dioscuri","Bornwithit","Sully","Shamrock","Lykoi"];
		fancy_dict["Meowstro"] = ["Onyx","Eclipse","Wowza"];
		fancy_dict["Atlas"] = ["Highlander","Kittencream","Swarley","Topoftheworld"];
		fancy_dict["Laafee-verte"] = ["Flapflap","Kurilian","Martian","Swampgreen","Seafoam","Pinefresh","Whixtensions","Buzzed","Highsociety"];
		fancy_dict["Furrball"] = ["Unknown_s","Norwegianforest","Totesbasic_f","Walrus","Littlefoot"]
		fancy_dict["Prune"] = ["Unknown_r","Norwegianforest","Totesbasic_f"]
		fancy_dict["Pawzilla"] = ["Jaguar","Littlefoot","Universe","Atlantis"]
		fancy_dict["Sheila"] = ["Icy","Fangtastic","Mauveover","Wingtips"]
		var targeted_traits = fancy_dict[args[6]];
		var bottleneckTrait = args[7] 		
		var Fancyfier = require("../core-modules/fancyfier/Fancyfier")(config.upper_wallet_address, web3, ck_contract, targeted_traits, dominantCount, bottleneckTrait);
		var stages = Fancyfier.mainStarter(gen_from, gen_to, cats);


	}

	function BreedingPair(id1, id2, score){
		this.id1 = id1;
		this.id2 = id2;
		this.score = score;
	}

	async function fancify(){
		var kittenLoader = require("../core-modules/kitten-loader/KittenLoader")(args);
		if(args[2] == "make-fancy-catX"){
			let cats = await kittenLoader.loadKittens()
			startFancyCatProcessX(cats)
		} else {
			let cats = kittenLoader.loadKittens()
			startFancyCatProcess(cats)
		}

		
	}




	self.start = function(){
		let timePerIteration = 1200000;

		if(parseInt(config.time_per_iteration,10) != 0){
			timePerIteration = config.time_per_iteration;
		}
		for(v = 0; v <=50; v++){
			setTimeout(fancify,timePerIteration*v);

			console.log("Scheduling: " + v);
		}

	}


	return self;
}

module.exports = { makeFancyCat }