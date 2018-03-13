var CKClient = require("ckclient")();
var net = require('net');
var Web3 = require("Web3");
var fs = require("fs");
var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net));

//Address of the wallet containing the cats, can be set in the console afterwards
//or provided as a start parameter
var owner_wallet_address = "0x68b42e44079d1d0a4a037e8c6ecd62c48967e69f";

//Contract address of cryptokitties (does not change)
var cryptokitties_contract_address = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
var upper_wallet_address = "0x68b42e44079D1d0A4a037e8c6eCd62c48967e69f";
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
var amountOfCalls = 400;
console.log(amountOfCalls);

var i = 0;

//Dictionary
var o = {};

function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

//List of ids and strings in the dictionary
o['kitten_ids'] = [];
o['kitten_strings'] = [];
o['kittens'] = []
//List of cats
var cats = [];

//Class describing a cat
function Cat(id, generation, attributeList) {
	this.id = id;
	this.generation = generation;
	this.attributeList = attributeList;
}

//Tuple describing a breeding pair
function BreedingPair(id1, id2){
	this.id1 = id1;
	this.id2 = id2;
}

var callsMade = 0;
var callsHandled = 0;
function handleKittens(kittens){
	var promiseArray = []
	for (kitten in kittens){
		//console.log(kittens[kitten]);
		promiseArray[kitten] = CKClient.getKitten(kittens[kitten].id).then(handleKitten);
	}
	return Promise.all(promiseArray);
}


function handleKittensWithContract(kittens){
	var promiseArray = [];
	for (kitten in kittens){
		//id = kittens[kitten].id;
		console.log(kittens[kitten].id);
		promiseArray[kitten] = ck_contract.methods.getKitty(kittens[kitten].id).call().then(doWork.bind(null, kittens[kitten].id));
	}

	return Promise.all(promiseArray);
}

function doWork(id, kitten){
	kitten.id = id;
	cats.push(kitten);

}
function handleKitten(id,kitten){
	kitten.id = id;
	console.log(id);
	cats.push(kitten);
	return kitten;

}

function noKittensToHandle(kittens){
	console.log("got no kittens :( ");
}

function saveKittenIds(kittens){
	fs.writeFile('kittens.txt', kittens, (err) => {
  	if (err) throw err;
  	console.log('It\'s saved!');
});}


function refreshCats(){

}
function breedingLoop(){
	var filteredCatList = [];

	o = {};
	for (var kitten in cats){

		if(!o[cats[kitten].generation]){
			o[cats[kitten].generation] = [];
		}
		if(cats[kitten].generation <= generations_breeding_upper_limit){
			o[cats[kitten].generation].push(cats[kitten]);
			filteredCatList.push(cats[kitten]);
		}

	}

	//var catsToBeAuctioned = findAuctionItems(cats);
	findBreedingPairs(filteredCatList);
	console.log('Kitten breeding pairs found: %d', breedingPairs.length);
	//console.log("Auctionable items found: %d", catsToBeAuctioned.length);
	console.log(breedingPairs);
	console.log(web3.eth.defaultAccount);
	for (var bp in breedingPairs){
		//ck_contract.methods.breedWithAuto(breedingPairs[bp].id1, breedingPairs[bp].id2).send({from: web3.eth.defaultAccount, value: web3.utils.toWei("0.008", "ether") });
	}
	console.log("done");
}
var generations_breeding_upper_limit = 1;
function mainFunction (calls){
	console.log("is in main");

	var merged = [].concat.apply([], calls);
	
	z = 0;
	limit = 20;
	for(; z < limit;){
		setTimeout(breedingLoop, z*2000000);
		z++;

	}
	
}

//List of breeding pairs
var breedingPairs = [];
var kittyCount = 0;
//Block for calling the API. TODO: Can separate this into a function

function x(i){
	return new Promise(function(resolve, reject){
	setTimeout(resolve, 1000*i, CKClient.getUserKitties(owner_wallet_address,64,i*20));
})
}

function loopGetUserKitties(err, res){
	var promiseArray = []
	for(; i < amountOfCalls;) {
		promiseArray[i] = x(i).then(handleKittensWithContract,noKittensToHandle); 
		//promiseArray[i] = CKClient.getUserKitties(owner_wallet_address,64,i*20).then(handleKittensWithContract,noKittensToHandle);
		i++;
	}

	return Promise.all(promiseArray);
}

/*
for (; i < 5;) {
	CKClient().getKitten(5000+i).then(handleKitten);
	i++;
}*/
//Test output
loopGetUserKitties().then(mainFunction);
console.log('Kitten count: %d', kittyCount);
//amount of generations
var generations = 20




//logging how many cats there are of each generation



//console.log('Kitten generation: %d , count: %d', generation, count);

//function to remove element from array
function remove(array, element){
	return array.filter(function(e) { 
    return e !== element;
});
}

function triggerTransaction(id, id2){
	if(ck_contract.methods.isReadyToBreed(id) && ck_contract.methods.isReadyToBreed(id2)){
		if(ck_contract.methods.canBreedWith(id,id2)){
			console.log("Would have made transaction here!");
			ck_contract.methods.breedWithAuto(id, id2).send({from: web3.eth.defaultAccount, value: web3.utils.toWei("0.008", "ether") });
		}
	}

}
function check(id){
	ck_contract.methods.isPregnant(id).call().then(z => secondCheck(id,z));

	//triggerAuction(id);
}

function secondCheck(id, pregnant){
	if(!pregnant){
		ck_contract.methods.ownerOf(id).call().then(z => triggerAuction(id, z));

	} else {
		console.log("Pregnant cat!");
	}
}
function triggerAuction(id, address){
	//console.log(ck_contract.methods.getKitty(id).call());
	//if(ck_contract.methods.getKitty(id).siringWithId == 0){
	if(address != upper_wallet_address){
		console.log("Already on auction!")
		console.log(address);

	} else {
		ck_contract.methods.createSaleAuction(id,web3.utils.toWei("0.3", "ether"),web3.utils.toWei("0.05", "ether"), 604800).send({from: web3.eth.defaultAccount, gas: 900000});
		console.log("created auction for cat: %d", id);
	}
		
	//} else {
		//ck_contract.methods.createSaleAuction(id,web3.utils.toWei("0.3", "ether"),web3.utils.toWei("0.05", "ether"), 604800).send({from: web3.eth.defaultAccount, gas: 900000});
	//}
}
//function for finding and adding breeding pairs

function findAuctionItems(cats){
	var highGenCats = []
	for (var cat in cats){
		count = cat;
		cat = cats[cat];
		if(cat.generation >= 5){
			highGenCats.push(cat.id);
			setTimeout(check, 1000*count, cat.id);
		}

	}
	return highGenCats;
}
function findBreedingPairs(cats){
	var listOfUsedCats = []
	for (var cat in cats){
		count = cat;
		cat = cats[cat];
		var potentialPartners = o[cat.generation];
		var potentialPartners = remove(potentialPartners, cat.id);

		var tries = 0;
		var maxTries = 30;
		matchOrTimeOut = false;
		if(cat){
			while (!matchOrTimeOut){

				var potentialPartner = potentialPartners[Math.floor(Math.random()*potentialPartners.length)];
				bothReady = ck_contract.methods.isReadyToBreed(cat.id) && ck_contract.methods.isReadyToBreed(potentialPartner.id);
				if (ck_contract.methods.canBreedWith(cat.id,potentialPartner.id) && bothReady && (cat.id != potentialPartner.id)){


					if(!listOfUsedCats.includes(cat.id) && !listOfUsedCats.includes(potentialPartner.id)){
						breedingPairs.push(new BreedingPair(cat.id,potentialPartner.id));
						listOfUsedCats.push(cat.id);
						listOfUsedCats.push(potentialPartner.id);
						matchOrTimeOut = true;
						setTimeout(triggerTransaction,5000*count, cat.id, potentialPartner.id);

						o[cat.generation] = remove(o[cat.generation], potentialPartner.id);
						o[cat.generation] = remove(o[cat.generation], cat.id);
					}
					
				}
				tries++;
				if (tries > maxTries ){

					matchOrTimeOut = true;

				}

			}	
		}



	}
}






