var CKClient = require("ckclient")();
var net = require('net');
var upper_wallet_address = "0x68b42e44079D1d0A4a037e8c6eCd62c48967e69f";
var Web3 = require("Web3");
var fs = require("fs");
var Promise = require("bluebird");
var AdvancedBreeder = require('./advKittenBreedingFunctions');
var GeneDecoder = require("genedecoder")();
var Auctioneer = require("auctioneer")(upper_wallet_address, web3);
var generations_breeding_upper_limit = 0;
var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net));

var Breeder = require("breeder")(generations_breeding_upper_limit,upper_wallet_address, web3);
//Breeder = Breeder(generations_breeding_upper_limit);
var promiseLimit = require('promise-limit')

var api_calls_on = false;
//Address of the wallet containing the cats, can be set in the console afterwards
//or provided as a start parameter
var owner_wallet_address = "0x68b42e44079d1d0a4a037e8c6ecd62c48967e69f";

//Contract address of cryptokitties (does not change)
var cryptokitties_contract_address = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
//Kitty Contract ABI, does not change
var kitty_abi = 
[{"constant":true,"inputs":[{"name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cfoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_preferredTransport","type":"string"}],"name":"tokenMetadata","outputs":[{"name":"infoUrl","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"promoCreatedCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ceoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_STARTING_PRICE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setSiringAuctionAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pregnantKitties","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_kittyId","type":"uint256"}],"name":"isPregnant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_AUCTION_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"siringAuction","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setGeneScienceAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCEO","type":"address"}],"name":"setCEO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCOO","type":"address"}],"name":"setCOO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_kittyId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_endingPrice","type":"uint256"},{"name":"_duration","type":"uint256"}],"name":"createSaleAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"sireAllowedToAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_matronId","type":"uint256"},{"name":"_sireId","type":"uint256"}],"name":"canBreedWith","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"kittyIndexToApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_kittyId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_endingPrice","type":"uint256"},{"name":"_duration","type":"uint256"}],"name":"createSiringAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"val","type":"uint256"}],"name":"setAutoBirthFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_sireId","type":"uint256"}],"name":"approveSiring","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCFO","type":"address"}],"name":"setCFO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_genes","type":"uint256"},{"name":"_owner","type":"address"}],"name":"createPromoKitty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"secs","type":"uint256"}],"name":"setSecondsPerBlock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_CREATION_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setSaleAuctionAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_v2Address","type":"address"}],"name":"setNewAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"secondsPerBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"name":"ownerTokens","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_matronId","type":"uint256"}],"name":"giveBirth","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAuctionBalances","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"cooldowns","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"kittyIndexToOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cooAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"autoBirthFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"erc721Metadata","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_genes","type":"uint256"}],"name":"createGen0Auction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_kittyId","type":"uint256"}],"name":"isReadyToBreed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PROMO_CREATION_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contractAddress","type":"address"}],"name":"setMetadataAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"saleAuction","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getKitty","outputs":[{"name":"isGestating","type":"bool"},{"name":"isReady","type":"bool"},{"name":"cooldownIndex","type":"uint256"},{"name":"nextActionAt","type":"uint256"},{"name":"siringWithId","type":"uint256"},{"name":"birthTime","type":"uint256"},{"name":"matronId","type":"uint256"},{"name":"sireId","type":"uint256"},{"name":"generation","type":"uint256"},{"name":"genes","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_sireId","type":"uint256"},{"name":"_matronId","type":"uint256"}],"name":"bidOnSiringAuction","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"gen0CreatedCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"geneScience","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_matronId","type":"uint256"},{"name":"_sireId","type":"uint256"}],"name":"breedWithAuto","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"matronId","type":"uint256"},{"indexed":false,"name":"sireId","type":"uint256"},{"indexed":false,"name":"cooldownEndBlock","type":"uint256"}],"name":"Pregnant","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"approved","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"kittyId","type":"uint256"},{"indexed":false,"name":"matronId","type":"uint256"},{"indexed":false,"name":"sireId","type":"uint256"},{"indexed":false,"name":"genes","type":"uint256"}],"name":"Birth","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newContract","type":"address"}],"name":"ContractUpgrade","type":"event"}];

//Linking to the contract itself
var ck_contract = new web3.eth.Contract(kitty_abi,cryptokitties_contract_address);
//Owned cats API call template for illustration
var api_call = "https://api.cryptokitties.co/kitties?offset=60&limit=64&owner_wallet_address=" + owner_wallet_address + "&sorting=cheap&orderBy=current_price&orderDirection=asc";

var kittenID = 1;

//Single cat API call template for illustration
var api_call_single_kitten = "https://api.cryptokitties.co/kitties/";
web3.eth.defaultAccount = "0x68b42e44079d1d0a4a037e8c6ecd62c48967e69f"

function countHandler(counter){
	console.log(counter);
}
//Should state the number of cats in the address. Read only function, should not make a transaction
var count = ck_contract.methods.balanceOf(owner_wallet_address).call(null, countHandler);
console.log(count);
//API only provides 20 cats at a time, so we have to do count/20 calls.
var amountOfCalls = 120;
console.log(amountOfCalls);

var i = 0;

//Dictionary
var o = {};

//List of cats
var cats = [];

var callsMade = 0;
var callsHandled = 0;
function handleKittens(kittens){
	var promiseArray = []
	for (kitten in kittens){
		promiseArray[kitten] = CKClient.getKitten(kittens[kitten].id).then(handleKitten);
	}
	return Promise.all(promiseArray);
}

function handleKittensWithContract(kittens){	
	var promiseArray = [];	
	for (kitten in kittens){	
		promiseArray[kitten] = ck_contract.methods.getKitty(kittens[kitten].id).call().then(doWork.bind(null, kittens[kitten].id));	
	}	
	
	return Promise.all(promiseArray);
}


function handleKittensWithID(kittens){
	var promiseArray = [];
	//web3.eth.defaultBlock = 5356409;
	for(kitten in kittens){
		promiseArray[kitten] = ck_contract.methods.getKitty(kittens[kitten]).call().then(doWork.bind(null,kittens[kitten]));
	}

	//return Promise.map(promiseArray, Promise.resolve, {concurrency: 1}).catch(function(err){
	//console.log("Had " + result.length + " pending promises(map)!");
	//return promiseArray;
	//});
	
	return Promise.all(promiseArray).catch(function(err){
		//var result = promiseArray.filter(z => z.id);
		//console.log("Had " + result.length + " pending promises!");
		return promiseArray;
	});
	//return Promise.settleVal(null,promiseArray);
}
function testFunction(p,count){
	if(count <= 200){
		return Promise.resolve(p).catch(function(err){
			return testFunction(p,count+1);
		})
	} else {
		return null;
	}

}
Promise.settleVal = function(rejectVal, promises) {
    return Promise.all(promises.map(function(p) {
        // make sure any values or foreign promises are wrapped in a promise
        return Promise.resolve(p).catch(function(err) {
            // instead of rejection, just return the rejectVal (often null or 0 or "" or {})
        	return testFunction(p,0);

            //return rejectVal;
        });
    }));
};


function contains(arr, x) {
    return arr.filter(function(elem) { return elem.id == x.id }).length > 0;
}

function doWork(id, kitten){
	kitten.id = id;
	kitten.chanceOfTrait = {};
	if(kitten.genes){
		//if(!cats.includes(kitten)){
		if(!contains(cats, kitten)){
			cats.push(kitten);
		}
		//}
	}
	return kitten;

}
function handleKitten(id,kitten){
	kitten.id = id;
	console.log(id);
	if(!contains(cats,kitten)){
		cats.push(kitten);
	}
	return kitten;

}

function noKittensToHandle(kittens){
	console.log("got no kittens :( ");
}

function saveKittenIds(kittens){
	output = [];
	for (var kitten in kittens){
		output.push(kittens[kitten].id);
	}
	fs.writeFile('kittens2.txt', output, (err) => {
  	if (err) throw err;
  	console.log('It\'s saved!');
});}
const args = process.argv;
console.log(args);
function mainFunction (calls){
	console.log("is in main");
	var PremierMutations = {};

	PremierMutations["Norwegianforest"] = ["Savannah","Selkirk"];
	PremierMutations["Pumpkin"] = ["Thundergrey","Gold"];
	PremierMutations["Cloudwhite"] = ["Shadowgrey","Salmon"];
	PremierMutations["Daffodil"] = ["Belleblue","Sandalwood"];
	PremierMutations["Cheeky"] = ["Wasntme","Whixtensions"];
	
	PremierMutations["Thunderstruck"] = ["Rascal","Ganado"];
	PremierMutations["Limegreen"] = ["Topaz","Mintgreen"];
	PremierMutations["Alien"] = ["Serpent","Googly"];
	PremierMutations["Safetyvest"] = ["Egyptiankohl","Poisonberry"];
	PremierMutations["Flamingo"] = ["Peach","Icy"];
	PremierMutations["Elk"] = ["Wild_3","Wild_4"];
	PremierMutations["Starstruck"] = ["Wuvme","Gerbil"];
	
	PremierMutations["Dippedcone"] = ["Leopard","Camo"];
	PremierMutations["Fabulous"] = ["Otaku","Simple"];
	PremierMutations["Oldlace"] = ["Cottoncandy","Mauveover"];
	PremierMutations["Turtleback"] = ["Lilac","Apricot"];

	PremierMutations["Bubblegum"] = ["Chestnut","Strawberry"];
	PremierMutations["Raisedbrow"] = ["Crazy","Thicccbrowz"];
	PremierMutations["Koala"] = ["Aquamarine","Nachocheez"];
	PremierMutations["Bloodred"] = ["Kittencream","Emeraldgreen"];
	PremierMutations["Trioculus"] = ["Wild_7","Wild_8"];

	PremierMutations["Tigerpunk"] = ["Calicool","Luckystripe"];
	PremierMutations["Twilightsparkle"] = ["Sapphire","Forgetmenot"];
	PremierMutations["Wolfgrey"] = ["Swampgreen","Violet"];
	PremierMutations["Dali"] = ["Beard","Pouty"];

	PremierMutations["Mainecoon"] = ["Chartreux","Himalayan"];
	PremierMutations["Henna"] = ["Amur","Jaguar"];
	PremierMutations["Cerulian"] = ["Scarlet","Barkbrown"];
	PremierMutations["Grimace"] = ["Saycheese","Grim"];

	PremierMutations["Laperm"] = ["Munchkin","Sphynx"];
	PremierMutations["Sass"] = ["Chronic","Slyboots"];
	PremierMutations["Skyblue"] = ["Coffee","Lemonade"];
	PremierMutations["Periwinkle"] = ["Azaleablush","Missmuffet"];

	PremierMutations["Persian"] = ["Ragamuffin","Ragdoll"];
	PremierMutations["Totesbasic_p"] = ["Totesbasic_f","Totesbasic_g"];
	PremierMutations["Sweetmeloncakes"] = ["Wiley","Stunned"];
	PremierMutations["Verdigris"] = ["Hintomint","Bananacream"];
	PremierMutations["Patrickstarfish"] = ["Morningglory","Frosting"];
	PremierMutations["Tongue"] = ["Happygokitty","Soserious"];

	var	SecondaryMutations = {}
	SecondaryMutations["Babypuke"] = ["Pumpkin","Limegreen"];
	SecondaryMutations["Seafoam"] = ["Daffodil","Flamingo"];
	SecondaryMutations["Yokel"] = ["Cheeky","Starstruck"];

	SecondaryMutations["Wingtips"] = ["Fabulous","Raisedbrow"]
	SecondaryMutations["Onyx"] = ["Oldlace","Koala"];

	SecondaryMutations["Hotrod"] = ["Tigerpunk","Henna"];
	SecondaryMutations["Royalblue"] = ["Wolfgrey","Cerulian"];
	SecondaryMutations["Neckbeard"] = ["Dali","Grimace"];

	SecondaryMutations["Manx"] = ["Laperm","Persian"];
	SecondaryMutations["Buzzed"] = ["Sass","Sweetmeloncakes"];
	SecondaryMutations["Mintmacaron"] = ["Periwinkle","Patrickstarfish"];


	//var targeted_traits = ["Elk","Cyan","Cymric","Happygokitty"];
	var targeted_traits = ["Strawberry","Chocolate","Wuvme","Baddate"];
	var BFAttempt = ["Egyptiankohl","Cerulian","Himalayan","Wuvme"];
	var BFAttempt2 = ["Wuvme","Otaku","Himalayan"];
	var BFAttempt3 = ["Wuvme","Himalayan","Royalblue"];
	var BFAttempt4 = ["Hotrod","Himalayan","Wuvme"];
	var BFAttempt5 = ["Himalayan","Dippedcone"];
	var VernonAttempt = ["Amur","Springcrocus","Fabulous","Belleblue","Cloudwhite"];
	var Springcrocus = ["Springcrocus"];
	var Pumpkin = ["Thundergrey", "Gold"];
	var Limegreen = ["Topaz","Mintgreen"];
	var Starstruck = ["Wuvme", "Gerbil"];
	var Cheeky = ["Wasntme","Whixtensions"];
	var listOfSecondaryMutations = ["Babypuke","Seafoam","Yokel","Wingtips","Onyx","Hotrod","Royalblue","Neckbeard"
	,"Manx","Buzzed","Mintmacaron"];

	var targeted_traits = [];
	var mandatoryUnchain = ["Alien","Koala","Verdigris","Trioculus","Wolfgrey","Dali","Fabulous","Flamingo","Dippedcone","Cheeky","Dippedcone","Starstruck"];
	var listOfTargetedTraitCombinations = ["Pumpkin","Fabulous","Cheeky","Starstruck","Cheeky","Flamingo","Koala","Laperm","Persian","Tigerpunk","Sweetmeloncakes","Dali","Wolfgrey","Cerulian","Periwinkle","Patrickstarfish", "Alien","Trioculus","Elk","Dippedcone","Thunderstruck","Verdigris"];
	var sixPercenters = ["Flamingo","Cerulian","Wolfgrey","Sweetmeloncakes","Dali","Koala","Starstruck","Cheeky"];
	listOfSecondaryMutations = shuffle(listOfSecondaryMutations);
	listOfTargetedTraitCombinations = shuffle(listOfTargetedTraitCombinations);
	var unchained = false;
	var sixPercent = false;
	var tryAll = false;
	var tryAllGen0 = false;
	if(args[2] != "all-gen1"){
		if(args[3] == "gen1"){
			targeted_traits = SecondaryMutations[args[2]];
		} else {
			targeted_traits = PremierMutations[args[2]];
			targeted_traits = VernonAttempt;
		}
	}
	if(args[2] == "all-gen1"){
		tryAll = true;
		targeted_traits = ["sample"];
	}

	if(args[2] == "all-gen0"){
		tryAllGen0 = true;
		targeted_traits = ["sample"];
	}


		
	console.log("Looking for " + args[2] + "!");
	for(var unVar in mandatoryUnchain){
		unVar = mandatoryUnchain[unVar];
		if(unVar == args[2]){
			unchained = true;
			console.log("Set unchained?");
		}
	}

	for(var sixVar in sixPercenters){
		sixVar = sixPercenters[sixVar];
		if(sixVar == args[2]){
			sixPercent = true;
			console.log("Set six percent");
		}
	}
	

	if(api_calls_on){
		saveKittenIds(cats);
	}

	console.log("There are " + cats.length + " cats in the list!");
	console.log("There are " + allFilteredCats.length + " cats in the filtered list!");
	//cats = allFilteredCats;
	//findAuctionItems(cats);
	if(targeted_traits.length != 0){
		console.log("heading into advanced breeding loop");
		//GeneDecoder.statistics(cats);


		if(tryAll){
			console.log("In try all");
			for(var secondaryMutationTarget in listOfSecondaryMutations){
				sMT = listOfSecondaryMutations[secondaryMutationTarget];
				Breeder.advancedBreedingLoop(cats, SecondaryMutations[sMT], ck_contract,1, unchained, sixPercent);
			}
		} else if(tryAllGen0){
			console.log("In try all gen0");
			gen0Breeder(listOfTargetedTraitCombinations, mandatoryUnchain, PremierMutations, cats,sixPercenters);
		} else {
			console.log("In normal generational loop");
			Breeder.advancedBreedingLoop(cats, targeted_traits, ck_contract, 999, unchained, sixPercent);
			/*
			for(var x = 0; x <= generations_breeding_upper_limit; x++ ){
				Breeder.advancedBreedingLoop(cats, targeted_traits, ck_contract,x, unchained, sixPercent);
			}*/
		}

	} else {
		Breeder.breedingLoop(cats, ck_contract);
	}

}

function gen0Breeder(listOfTargetedTraitCombinations, mandatoryUnchain, PremierMutations, cats, sixPercenters){

	for(var traitCombo in listOfTargetedTraitCombinations){
		unchained = false;
		var count = traitCombo;
		var sixPercent = false;
		traitCombo = listOfTargetedTraitCombinations[traitCombo];
		if(mandatoryUnchain.includes(traitCombo)){
			unchained = true;
		}
		if(sixPercenters.includes(traitCombo)){
			sixPercent = true;
		}
		nbdList = [];
		setTimeout(Breeder.advancedBreedingLoop, 100000*count, cats, PremierMutations[traitCombo], ck_contract, 0, unchained, sixPercent);
	}

}
//List of breeding pairs
var breedingPairs = [];
var kittyCount = 0;
//Block for calling the API. TODO: Can separate this into a function

function fetch(id){
	console.log("Fetching " + id);
	return Promise.delay(3000, id).then(CKClient.getUserKitties(owner_wallet_address,64,id*20)
		.then(handleKittensWithContract, noKittensToHandle));
}
function loopGetUserKitties(err, res){
	var promiseArray = []
	array = new Array();
	//Most likely only need last 1000 cats or so, the rest is already present.
	for (i = 0; i < amountOfCalls; i++) {
    	array[i] = i;
	}
	//array = array.filter(function(e){return e}); 
	console.log(array.length);
	console.log(array);
	return Promise.map(array, fetch, {concurrency: 1});
}

function doFilterWork(cat,address){
	if(address == upper_wallet_address){
		allFilteredCats.push(cat);
		//console.log("Found owned cat!")
		//return cat;
	}

}
function job (name) {
  var text = `job ${name}`
  console.log('started', text)
 
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log('       ', text, 'finished')
      resolve(text)
    }, 100)
  })
}

var ownedTokens = [];
function placeTokensInGlobalList(tokens){
	console.log("Found tokens: " + tokens);
	console.log(tokens.length);
	ownedTokens = tokens;
}
function getTokensOfOwner(){
	var aPromise = ck_contract.methods.tokensOfOwner(owner_wallet_address).call({gas:9900000000000}).then(placeTokensInGlobalList);
	console.log(aPromise);
	return Promise.all([aPromise]).catch(function(err){
		console.log(err);
	});
}

function getOwnershipOfCatsLoop(cats){
	return cats.reduce(function(promise, cat) {
		return promise.then(function(){
			return ck_contract.methods.ownerOf(cat).call().then(doFilterWork.bind(null, cat));
		});
	}, Promise.resolve());
}

function checkOwnershipOfCats(cats_bad){
	var promiseArray = [];
	for(var cat in cats){
		counter = cat;
		cat = cats[cat];
		promiseArray[counter] = ck_contract.methods.ownerOf(cat.id).call().then(doFilterWork.bind(null,cat));
	}
	//return Promise.settleVal(null,promiseArray).catch(console.log("Failed to check cat ownership"));
	return Promise.all(promiseArray).catch(console.log("Cat owner lookup failed somewhere:("));
}
function grabAllOwnedCatsFromBlockchain(){

	var promiseArray = [];
	for(var i = 0; i < 700000; i++){
		promiseArray[i] = ck_contract.methods.ownerOf(i).call().then(doFilterWork.bind(null,i));

	}
	console.log("done adding promises?");
	var limit = promiseLimit(1000);

	return Promise.all(promiseArray.map((name) => {
  		return limit(() => job(name))
	}))
	/*
	return Promise.all(promiseArray).catch(function(err){
		{
			console.log(err);
		}});*/
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function loopGetUserKittesNAPI(err, res){
	var text = fs.readFileSync('C:/users/eulve/autokitty/kittens/kittens.txt', 'utf8');
	var splitText = text.split(",");
	/*
	for(var y = 2; y <= 21; y++){
		var secondText = fs.readFileSync('C:/users/eulve/autokitty/kittens/kittens'+y+'.txt', 'utf8');
		var secondSplitText = secondText.split(",");
		for(var kittenID in secondSplitText){
			kittenID = secondSplitText[kittenID];
			if(!splitText.includes(kittenID)){
				splitText.push(kittenID);
			}
		}
	}*/
	
	var text = fs.readFileSync('C:/users/eulve/autokitty/kittens/gen01.txt', 'utf8');
	var splitText = text.split(",");

	for(var xy = 2; xy <= 8; xy++){
		var secondText = fs.readFileSync('C:/users/eulve/autokitty/kittens/gen0'+xy+'.txt','utf8');
		var secondSplitText = secondText.split(",");
		for(var kittenID in secondSplitText){
			kittenID = secondSplitText[kittenID];
			if(!splitText.includes(kittenID)){
				splitText.push(kittenID);
			}
		}
	}


	return splitText;
}

function chunkify(a, n, balanced) {
    
    if (n < 2)
        return [a];

    var len = a.length,
            out = [],
            i = 0,
            size;

    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }

    else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }

    else {

        n--;
        size = Math.floor(len / n);
        if (len % size === 0)
            size--;
        while (i < size * n) {
            out.push(a.slice(i, i += size));
        }
        out.push(a.slice(size * n));

    }

    return out;
}
var allFilteredCats = [];
function helper(){
	var kittens = loopGetUserKittesNAPI();
	console.log("Amount of kittens in the external ID list is: " + kittens.length );
	//var kittens = grabAllOwnedCatsFromBlockchain();
	console.log(cats.length);
	var kittenArrays = chunkify(kittens,100,false);
	var promiseArrayStack = [];
	//return handleKittensWithID(kittens);

	for(var kittenArray in kittenArrays){
		promiseArrayStack[kittenArray] = handleKittensWithID(kittenArrays[kittenArray]);
	}
	//return Promise.map(promiseArrayStack, Promise.resolve, {concurrency: 1});
	return Promise.all(promiseArrayStack).catch(console.log("Error in helper?"));
	//return Promise.settleVal(null,promiseArrayStack);
}

function getCatsLoop(no_catArray){
	return allFilteredCats.reduce(function(promise, cat) {
		return promise.then(function(){
			return ck_contract.methods.getKitty(cat).call().then(doWork.bind(null, cat));
		});
	}, Promise.resolve());
}


//Test output
for(v = 0; v <=200; v++){
	setTimeout(realMain,3000000*v);
	console.log("Scheduling: " + v);
}


function realMain(){
	if(api_calls_on){
		loopGetUserKitties().then(mainFunction);
	} else {
		//Promise.delay(10000).then(helper().then(mainFunction));
		//Promise.delay(3000).then(helper).then(checkOwnershipOfCats).then(mainFunction);
		var kittens = loopGetUserKittesNAPI();
		console.log("There are: " + kittens.length + "kitten IDS stored on disk");
		//getCatsLoop(kittens).then(getOwnershipOfCatsLoop(kittens)).then(mainFunction);
		//getCatsLoop(kittens).then(getOwnershipOfCatsLoop).then(mainFunction);
		getOwnershipOfCatsLoop(kittens).then(getCatsLoop).then(mainFunction);

		//Promise.delay(3000).then(helper).then(helper).then(helper).then(helper).then(helper).then(checkOwnershipOfCats).then(mainFunction);
		//loopGetUserKittesNAPI().then(handleKittensWithID).then(mainFunction);
	}
}

function isEmptyObject( obj ) {
    for ( var name in obj ) {
        return false;
    }
    return true;
}
