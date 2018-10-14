function Auctioneer(upper_wallet_address, web3, ck_contract, price_from, price_to){
	let self = {};
	self.web3 = web3;
	self.upper_wallet_address = upper_wallet_address;
	self.ck_contract = ck_contract;
	if(price_from != undefined){
		self.price_from = price_from;
		self.price_to = price_to;
	} else {
		self.price_from = '1';
		self.price_to = '1';
	}
	self.check = function(id){
		self.ck_contract.methods.isPregnant(id).call().then(z => self.secondCheck(id,z));
	}

	self.secondCheck = function(id, pregnant){
		if(!pregnant){
			self.ck_contract.methods.ownerOf(id).call().then(z => self.triggerAuction(id, z));
		} else {
			console.log("Pregnant cat!");
		}
	}
	self.triggerAuction = function(id, address){
		//console.log(ck_contract.methods.getKitty(id).call());
		//if(ck_contract.methods.getKitty(id).siringWithId == 0){
		if(address != self.upper_wallet_address){
			console.log("Already on auction!")
			console.log(address);

		} else {
			ck_contract.methods.createSaleAuction(id,web3.utils.toWei(self.price_from, "ether"),web3.utils.toWei(self.price_to, "ether"), 864000).send({from: web3.eth.defaultAccount, gas: 900000, gasPrice: web3.utils.toWei("0.000000012", "ether")});
			console.log("(((would have)))");
			console.log("created auction for cat: %d", id);
		}
			
	}
	self.searchForTrait = function(trait, gen, ck_contract){
		
	}
	self.findAuctionItems = function(cats, ck_contract){
		self.ck_contract = ck_contract;
		var highGenCats = []
		for (var cat in cats){
			count = cat;
			cat = cats[cat];
			if(cat.generation >= 5){
				highGenCats.push(cat.id);
				setTimeout(self.check, 2000*count, cat.id);
			}

		}
		console.log("Found " + highGenCats.length + " possible auctions!");
		return highGenCats;
	}

	return self;
}

module.exports = Auctioneer;