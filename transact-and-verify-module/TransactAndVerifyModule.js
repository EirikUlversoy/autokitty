function TransactAndVerifyModule(web3, ck_contract, upper_wallet_address){
	var self = {};
	self.ck_contract = ck_contract;
	self.upper_wallet_address = upper_wallet_address;
	self.web3 = web3;
	
	self.performReadyChecksThenBreed = function(id, id2){
		self.readyToBreedCheckA(id,id2);
	}
	self.readyToBreedCheckA = function(id, id2){
		self.ck_contract.methods.isReadyToBreed(id).call().then(z => self.readyToBreedCheckB(id, id2, z));
	}

	self.readyToBreedCheckB = function(id, id2, aIsReady){
		if(aIsReady){
			self.ck_contract.methods.isReadyToBreed(id2).call().then(z => self.notOnAuctionCheckA(id, id2, z));
		} else {
			console.log("A not ready");
		}
	}

	self.notOnAuctionCheckA = function(id, id2, bIsReady){
		if(bIsReady){
			self.ck_contract.methods.ownerOf(id).call().then(z => self.notOnAuctionCheckB(id, id2, z));
		} else {
			console.log("B not ready");
		}
	}
	self.notOnAuctionCheckB = function(id, id2, address){
		if(address != self.upper_wallet_address){
			console.log("For sale, cannot breed");
		} else {
			self.ck_contract.methods.ownerOf(id2).call().then(z => self.canBreedWithCheck(id,id2,z));
		}
	}
	self.canBreedWithCheck = function(id, id2, address){
		if(address != upper_wallet_address){
			console.log("for sale, cannot breed");
		} else {
			self.ck_contract.methods.canBreedWith(id,id2).call().then(z => self.triggerTransactionOnly(id,id2,z));
		}
	}

	self.triggerTransactionOnly = function(id, id2, canBreed){
		if(canBreed){
			self.ck_contract.methods.breedWithAuto(id, id2).send({from: self.web3.eth.defaultAccount, value: self.web3.utils.toWei("0.008", "ether"),gasPrice: self.web3.utils.toWei("0.000000002", "ether") });
			console.log("Breeding: " + id +" and " + id2 + " together!");
			console.log("(((would have)))");
		} else {
			console.log("Breeding failed. Possible cause: Too close relation");
		}
	}
	
	return self;
}

module.exports = TransactAndVerifyModule;