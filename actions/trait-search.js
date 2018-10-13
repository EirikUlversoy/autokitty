var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");
var mutationDicts = require("../core-modules/mutation-dictionary-module/MutationDictionaries")().setupDictionaries();
//Other modules from this repository
var GeneDecoder = require("../core-modules/genedecoder/Genedecoder")();

function traitSearch(optional_arguments){
	var config = require('../helpers/config-module');
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
	//List of cats
	if(optional_arguments != undefined){
		args = optional_arguments
	} else {
		args = process.argv;
	}
	console.log(optional_arguments)
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

	var fancy_list = [];
	fancy_list.push(["Belch","Nachocheez","Buzzed","Sandalwood"]);
	fancy_list.push(["Wiley","Cerulian","Rollercoaster","Ganado"]);
	fancy_list.push(["Norwegianforest", "Thicccbrowz", "Orangesoda","Luckystripe"]);
	fancy_list.push(["Rascal", "Wasntme","Peach"]);
	fancy_list.push(["Salty","Verdigris","Turtleback","Cyan"]);
	fancy_list.push(["Ragdoll", "Crazy", "Bananacream", "Chocolate", "Mintmacaron","Yokel"]);
	fancy_list.push(["Googly","Beard","Royalpurple","Dippedcone"]);
	fancy_list.push(["Redvelvet","Patrickstarfish","Dragontail","Sphynx"]);

	function searchForAnyOfMultipleTraitsFancy(){
		var traitFileName = args[3]
		var kittenLoader = require("kitten-loader")(args);
		targetedTraits = kittenLoader.loadTraits(traitFileName);
		console.log(targetedTraits)
		var gen = parseInt(args[4],10);
		var cooldown = args[5];
		var includeFancySet = (args[6] == 'true')
		var dominantOnlySet = (args[7] == 'true')
		if(gen != 99){
			cats = Utilities.separateByGeneration(cats, gen, gen)
		}
		var all_cats = []
		console.log(cats)
		for(var trait in targetedTraits){
			trait = targetedTraits[trait];
			cats = GeneDecoder.findCatsWithTraitCombination(cats, [trait], cooldown, dominantOnlySet);
			console.log(cats)
			all_cats = all_cats.concat(cats)
		}

		function saveKittenIds(kittens, name){
			output = [];
			for (var kitten in kittens){
				output.push(kittens[kitten].id);
			}
			fs.writeFile(__dirname + '/../fancids/'+traitFileName + kittens[0].generation + '.txt', output, (err) => {
		  	if (err) throw err;
		  	console.log('It\'s saved!');
		});}
		console.log(all_cats)
		saveKittenIds(all_cats, "")


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
		var top_hundred_id = parseInt(args[8],10)
		var max_amount = parseInt(args[9],10)
		var ending_id = parseInt(args[10],10)

		if(gen != 99){
			cats = Utilities.separateByGeneration(cats, gen, gen);
		}
		cats = GeneDecoder.findCatsWithTraitCombination(cats, targetedTraits, cooldown, dominantOnlySet);
		if(!includeFancySet){
			cats = GeneDecoder.filterOutFancies(cats, fancy_list);
		}
		new_cats = []
		console.log("top hundred id is: " + top_hundred_id)
		if(top_hundred_id > 0){
			for(var cat in cats){
				if(cats[cat].id > top_hundred_id && cats[cat].id <= ending_id){
					new_cats.push(cats[cat])
				}
				if(new_cats.length >= max_amount){
					break;
				}
			}
		} else {
			new_cats = cats
		}
		console.log("found: " + new_cats.length + "cats!");
		Utilities.saveKittenIds(new_cats, process.cwd() + '/pricing_searches/' + traitFileName +'OUT' + String(gen));
	}

	function BreedingPair(id1, id2, score){
		this.id1 = id1;
		this.id2 = id2;
		this.score = score;
	}

	function main(optional_arguments){
		if(optional_arguments != undefined){
			args = optional_arguments
		} else {

		}
		if(args[2] == "trait-search-multiple"){
			var kittenLoader = require("kitten-loader")(args);
			ck_contract.methods.totalSupply().call()
			.then(kittenLoader.loadKittens)
			.then(getOwnershipOfCatsFromContract)
			.then(getCatsFromContract)
			.then(searchForMultipleTraits);
		} else if (args[2] == "trait-search-multipleAUCTION"){

			var kittenLoader = require("kitten-loader")(args)
			ck_contract.methods.totalSupply().call()
			.then(kittenLoader.loadKittens)

			.then(getOwnershipOfCatsFromContract)
			.then(getCatsFromContract)
			.then(searchForMultipleTraits)
		} else if (args[2] == "fancy-filtering"){
			var kittenLoader = require("kitten-loader")(args);
			ck_contract.methods.totalSupply().call()
			.then(kittenLoader.loadKittens)
			.then(getOwnershipOfCatsFromContract)
			.then(getCatsFromContract)
			.then(searchForAnyOfMultipleTraitsFancy);
		} else {
			var kittenLoader = require("kitten-loader")(args);
			ck_contract.methods.totalSupply().call()
			.then(kittenLoader.loadKittens)
			.then(getOwnershipOfCatsFromContract)
			.then(getCatsFromContract)
			.then(searchForTrait);
		}

	}




	self.start = function(optional_arguments){
		main(optional_arguments);
	}


	return self;
}

module.exports = { traitSearch }