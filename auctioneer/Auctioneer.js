function Auctioneer(upper_wallet_address, web3){
	let self = {};
	self.web3 = web3;
	self.upper_wallet_address = upper_wallet_address;
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
			//ck_contract.methods.createSaleAuction(id,web3.utils.toWei("0.049", "ether"),web3.utils.toWei("0.01", "ether"), 3048000).send({from: web3.eth.defaultAccount, gas: 900000, gasPrice: web3.utils.toWei("0.000000015", "ether")});
			console.log("(((would have)))");
			console.log("created auction for cat: %d", id);
		}
			
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