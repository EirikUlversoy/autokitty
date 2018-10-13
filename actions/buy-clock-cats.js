var net = require('net');
const os = require('os');
var Web3 = require("web3");
var fs = require("fs");
var Promise = require("bluebird");
var mutationDicts = require("../mutation-dictionary-module/MutationDictionaries")().setupDictionaries();
//Other modules from this repository
var GeneDecoder = require("../core-modules/genedecoder/GeneDecoder")();
var Utilities = require("../helpers/utilities/Utility");
var config = require("../helpers/config/config");

function buyClockCats(){
	self = {};
	var args = process.argv;
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

	var pureBred = false;
	var optimizedR1 = true;
	var optimizedR2 = true;

	var desired_traits_dictionary = {};

	//Gets ownerof Address first, then checks if the cat is for sale
	function getCatsForSaleFromContract(cats){
		//If the owner address is the sale contract address, this cat is for sale so push it to filtered cats
		function addCatToList(cat,address){
			if(address == config.sale_contract_address){
				allFilteredCats.push(cat);
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

	function checkIfMatch(trait, gene_number, gene_array){
		if(gene_number == 3){
			if(desired_traits_dictionary[trait] == "D"){
				return true;
			}
		}

		if(gene_number == 2){
			if (desired_traits_dictionary[trait] == "R1"){
				
				if(optimizedR1){
					if((gene_array[2] == trait) && (gene_array[3] == trait)){
						return true;
					} else {
						return false;
					}	

				} else {
					return true;
				}

			}
		}

		if(gene_number == 1){
			if(desired_traits_dictionary[trait] == "R2"){
				if(optimizedR2){
					if(gene_array[3] == trait){
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		}

		if(gene_number == 0){
			console.log(desired_traits_dictionary);
			if(desired_traits_dictionary[trait] == "R3"){
				console.log("Found trait");
				return true;
			}
		}

		return false;
	};

	function scoreCat(gene_number, gene_array){
		gene = gene_array[gene_number];
		let genePositions = GeneDecoder.highest_gene_position_dict_creator();
		var rarity = genePositions[gene];
		if(gene_number == 3){
			if(rarity == "D"){
				return 0;
			}
		}

		if(gene_number == 2){
			if (rarity == "R1"){
				
				if(optimizedR1){
					if((gene_array[1] == gene_array[2]) && (gene_array[0] == gene_array[2])){
						return 2;
					} else {
						return 0;
					}	

				} else {
					return 0;
				}

			}
		}

		if(gene_number == 1){
			if(rarity == "R2"){
				if(optimizedR2){
					if(gene_array[0] == gene_array[1]){
						return 2;
					} else {
						return 1;
					}
				} else {
					return 1;
				}
			}
		}

		if(gene_number == 0){
			if(rarity == "R3"){
				return 1;
			}
		}

		return 0;
	};

	function buyFromClock(kittenTotal){

		var traits_filename = args[6];
		if(traits_filename != undefined){
			KittenLoader = require('kitten-loader')();
			traits = KittenLoader.loadTraits(traits_filename);
			

			//Initializing dictionary
			let genePositions = GeneDecoder.highest_gene_position_dict_creator();

			for(var trait in traits){
				rarity = genePositions[traits[trait]];
				if(rarity == undefined){
					rarity = "D";
				}

				desired_traits_dictionary[traits[trait]] = rarity;

			}
			
			console.log(desired_traits_dictionary);


			traitsHits = [];
			for(var trait in traits){
				traitsHits.push(0);
			}
			//So few cats should be present at the cat clock that inefficient loops are no issue. This changes
			//if the tool is applied to large cat lists.
			var catIdsToBuy = [];

			

			

			for(var cat in allFilteredCatsC){
				gene_arrays = GeneDecoder.readKitten(allFilteredCatsC[cat]);

				for(var gene_array in gene_arrays){
					gene_array = gene_arrays[gene_array];
					for(var trait in traits){
						number = trait;
						trait = traits[trait];
						console.log(gene_array);

						for(var gene in gene_array){								
							if(gene_array[gene] == trait) {

								if(checkIfMatch(trait,gene,gene_array)){
									traitsHits[number] = 1;
								}
								
							}
						}
					}
				}
				var valid = true;
				for (var trait in traits){
					console.log(traitsHits);
					if(traitsHits[trait] == 1){

					} else {
						valid = false;
					}
				}

				if(valid){
					catIdsToBuy.push(parseInt(allFilteredCatsC[cat].id,10));
					console.log("This cat fits the criteria:");
					console.log("ID:" + allFilteredCatsC[cat].id + "");
				}
				for (var trait in traits){
					traitsHits[trait] = 0;
				}
			}	
		} else {
			var catIdsToBuy = [];
			for(var cat in allFilteredCatsC){
				var minPoints = parseInt(args[5],10);
				var points = 0;
				gene_arrays = GeneDecoder.readKitten(allFilteredCatsC[cat]);

				for(var gene_array in gene_arrays){
					gene_array = gene_arrays[gene_array];
					for(var gene in gene_array){								
						points += scoreCat(gene, gene_array);
					}
				}
				var valid = true;

				if(points < minPoints){
					valid = false;
				}

				if(valid){
					catIdsToBuy.push(parseInt(allFilteredCatsC[cat].id,10));
					console.log("This cat fits the criteria:");
					console.log("It has " + points + " points!");
					console.log("ID:" + allFilteredCatsC[cat].id + "");
				}

			}	
		}





		//Buy given cats
		if(args[6] == undefined){
			console.log("Not specific buys");
			buyACat(catIdsToBuy, true);
		} else {
			console.log("Specific cat buys");
			buyACat(catIdsToBuy, true);

		}
	}

	function buyACat(catIdsToBuy, SPECIFIC){

		var cat_amount = parseInt(args[4],10);

		var price_roof = String(args[3]);

		if(price_roof > 12.00){
			console.log("Safety value hit, resetting price to 0.50");
			price_roof = String(12.00);
		}

		console.log(catIdsToBuy);
		for(var clockCat in catIdsToBuy){
			if(clockCat < cat_amount){
				var catID = undefined;
				if(SPECIFIC){
					catID = catIdsToBuy[clockCat];
				} else {
					catID = catIdsToBuy[clockCat].id;
				}
				console.log("Trying to buy for: " + price_roof);
				sale_contract.methods.bid(catID).send({from: web3.eth.defaultAccount, value: web3.utils.toWei(price_roof, "ether"),gasPrice: web3.utils.toWei("0.000000012", "ether"),gas:1000000 });
				console.log("Bought cat number: " + catID);
			} else {
				console.log("Bought all cats specified");
				break;
			}
		}

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
		for(var x = total-2000; x < total; x++){
			kittens.push(x);
		}
		return kittens;
	}

	self.start = function(){
		ck_contract.methods.totalSupply().call().then(initCatList).then(getCatsForSaleFromContract).then(getClockOwnershipOfCatsFromContract).then(getCatsFromContract).then(buyFromClock);
	}
	
	return self;
}

module.exports = { buyClockCats }