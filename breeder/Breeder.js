var GeneDecoder = require("genedecoder")();
function Breeder(generations_breeding_upper_limit, upper_wallet_address, web3){
	let self = {};
	self.o = {};
	self.web3 = web3;
	self.upper_wallet_address = upper_wallet_address;
	self.generations_breeding_upper_limit = generations_breeding_upper_limit;
	//Ck_contract needs to be initialized before breeding
	self.ck_contract = null;

	
	self.separateByGeneration = function(cats){
		var filteredCatList = [];

		for (var kitten in cats){

			if(!self.o[cats[kitten].generation]){
				self.o[cats[kitten].generation] = [];
			}
			if(cats[kitten].generation <= self.generations_breeding_upper_limit){
				self.o[cats[kitten].generation].push(cats[kitten]);
				filteredCatList.push(cats[kitten]);
			}

		}
		return filteredCatList;
	}

	function CatWithScore(id, score, missingTraits){
		this.id = id;
		this.score = score;
		this.missingTraits = missingTraits;
		}
	self.advancedBreedingLoop = function(cats, targetedTraits, ck_contract){
		self.ck_contract = ck_contract;
		var filteredCatList = self.separateByGeneration(cats);
		console.log("Excluded generations and was left with: " + filteredCatList.length + " cats!");
		var catsWithAnyTrait = self.findBreedingPairsTargeted(filteredCatList, targetedTraits);
		console.log('Fitting kittens found: %d', catsWithAnyTrait.length);
		//console.log(breedingPairs);
		console.log("Account used to breed: " + self.web3.eth.defaultAccount);
		var topLists = [];
		topLists = self.createTopLists(catsWithAnyTrait,targetedTraits);
		for(var nTopList in topLists){
			nTopList = topLists[nTopList];
			for(var rHolder in nTopList){
				rHolder = nTopList[rHolder];
				//console.log("Kitten with ID: " + rHolder.id);
				//console.log("Has the score: " + JSON.stringify(rHolder.chanceOfTrait,null,4));
			}
		}

		var largestTrait = null;
		var largestTraitList = 0;
		for(var trait in targetedTraits){
			var length = topLists[trait].length;
			if(length > largestTraitList){
				largestTrait = targetedTraits[trait];
				largestTraitList = length;
			}
		}

		console.log("Largest trait is: " + largestTrait);
		console.log("Amount of cats with the trait is: " + largestTraitList);
		var scores = self._scoreCatsBasedOnTraits(catsWithAnyTrait, targetedTraits);


		var arrayOfScoredCats = [];
		var scoreKeys = Object.keys(scores);

		for(var key in scoreKeys){
			key = scoreKeys[key];
			//arrayOfScoredCats.push(new CatWithScore(scores[score]))
			arrayOfScoredCats.push(scores[key]);
		}
		arrayOfScoredCats.sort(self._keyComparator("score"));
		console.log(arrayOfScoredCats);

		var breedingPairs = _simpleBreedingAlgorithm(cats, arrayOfScoredCats, targetedTraits);

	}

	self._triggerBreedingPairs = function(breedingPairs){
		for(var bp in breedingPairs){
			setTimeout(self.readyToBreedCheckA,150*count, bp.id1, bp.id2);
		}
	}
	self._simpleBreedingAlgorithm = function(cats, arrayOfScoredCats, targetedTraits){
		var catDictionary = {};
		var breedingPairs = [];

		for(var cat in cats){
			cat = cats[cat];
			catDictionary[cat.id] = cat;

		}

		var potentialPartners = arrayOfScoredCats.slice();

		for(var scoredCat in arrayOfScoredCats){
			count = scoredCat;
			scoredCat = arrayOfScoredCats[scoredCat];
			//Assuming 1 is a good score
			if(scoredCat in potentialPartners){
				if(scoredCat.score > 1){
					//Simplifying assumption
					if(scoredCat.missingTraits.length == 0){
						remove(potentialPartners, scoredCat.id);
						var partner = potentialPartners[0];
						remove(potentialPartners, partner.id);
						breedingPairs.push(new BreedingPair(scoredCat.id,partner.id));
					} else if (scoredCat.missingTraits.length == 1){
						var missingTrait = scoredCat.missingTraits[0];
						var missingTraitScoreList = self._scoreCatsBasedOnSingleTrait(cats, missingTrait);
						var orderedTraitScoreList = self._unorderedDictionaryToOrderedArrayByScore(missingTraitScoreList);
						remove(potentialPartners, scoredCat.id);
						var partner = orderedTraitScoreList[0];
						remove(potentialPartners, partner.id);
						breedingPairs.push(new BreedingPair(scoredCat.id,partner.id));
					} else if (scoredCat.missingTraits.length == 2) {
						var missingTraits = scoredCat.missingTraits;
						var firstMissingTraitScoreList = self._scoreCatsBasedOnSingleTrait(cats, missingTraits[0]);
						var secondMissingTraitScoreList = self._scoreCatsBasedOnSingleTrait(cats, missingTraits[1]);
						var firstOrderedTraitScoreList = self._unorderedDictionaryToOrderedArrayByScore(firstMissingTraitScoreList);
						var secondOrderedTraitScoreList = self._unorderedDictionaryToOrderedArrayByScore(secondMissingTraitScoreList);

						for(var tCat in firstOrderedTraitScoreList){
							var tCat = firstOrderedTraitScoreList[tCat];
							//TODO: 0.3 magic number 
							if(secondMissingTraitScoreList[tCat.id] > 0.1 ){
								remove(potentialPartners, scoredCat.id);
								var partner = tCat;
								remove(potentialPartners, partner.id);
								breedingPairs.push(new BreedingPair(scoredCat.id, partner.id));
								break;
							}
						}
					}
				}
			}

		}
		console.log("Tried to find breeding pairs...");
		console.log("Found: " + breedingPairs.length + " breeding pairs!");
		return breedingPairs;
	}
	self._unorderedDictionaryToOrderedArrayByScore = function(catDictionary){
		var scoreKeys = Object.keys(catDictionary);
		var arrayOfScoredCats = [];
		for(var key in scoreKeys){
			key = scoreKeys[key];
			arrayOfScoredCats.push(new CatWithScore(key, catDictionary[key], ""));
			//arrayOfScoredCats.push(scores[key]);
		}

		arrayOfScoredCats.sort(self._keyComparator("score"));

		return arrayOfScoredCats;

	}
	self._scoreCatsBasedOnSingleTrait = function(cats, trait){
		var catScores = {};
		for(var cat in cats){
			var count = cat;
			cat = cats[cat];
			var score = 0;
			var chance = cat.chanceOfTrait[trait];
			if(chance > 0){
				score += chance;
			}
			catScores[cat.id] = score;

		}
		return catScores;
	}


	self._scoreCatsBasedOnTraits = function(cats, targetedTraits){
		var catScores = {};
		//Dictionary pairing catIDs with scores.

		for(var cat in cats){
			var count = cat;
			cat = cats[cat];
			var score = 0;
			var missingTraits = [];
			for(var trait in targetedTraits){
				var chance = cat.chanceOfTrait[targetedTraits[trait]];
				if(chance > 0){
					score += chance;
				} else {
					missingTraits.push(targetedTraits[trait]);
				}

			}
			catScores[cat.id] = new CatWithScore(cat.id, score, missingTraits);
		}

		return catScores;
	}
	self.createTopLists = function(cats,targetedTraits){
		var topLists = [];
		for(var trait in targetedTraits){
			trait = targetedTraits[trait];
			traitTopList = self.createSingleTopList(cats, trait);
			topLists.push(traitTopList);
			//console.log(traitTopList);
		}

		return topLists;
	}

	self.createSingleTopList = function(cats, trait){
		var topList = [];
		for(var cat in cats){
			cat = cats[cat];
			if(cat.chanceOfTrait[trait]){
				topList.push(cat);
			}

		}
		topList.sort(self.traitScoreComparator(trait));
		return topList;
	}
	self._keyComparator = function(key){
		var sortOrder = -1;
		if(key[0] === "-"){
			sortOrder = -1;
			key = key.substr(1); 
		}

		return function(a,b){
			var result = (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0;
			return result * sortOrder;
		}
	}
	self.traitScoreComparator = function(trait){
		var sortOrder = 1;
		if(trait[0] === "-") {
			sortOrder = -1;
			trait = trait.substr(1);
		}

		return function (a,b) {
	        var result = (a.chanceOfTrait[trait] < b.chanceOfTrait[trait]) ? -1 : (a.chanceOfTrait[trait] > b.chanceOfTrait[trait]) ? 1 : 0;
	        return result * sortOrder;
	    }

	}

	self.breedingLoop = function(cats, ck_contract){
		self.ck_contract = ck_contract;
		var filteredCatList = self.separateByGeneration(cats);
		breedingPairs = self.findBreedingPairs(filteredCatList);
		console.log('Kitten breeding pairs found: %d', breedingPairs.length);
		console.log("Account used to breed: " + self.web3.eth.defaultAccount);
	}
	self.o = {};
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
			//self.ck_contract.methods.breedWithAuto(id, id2).send({from: self.web3.eth.defaultAccount, value: self.web3.utils.toWei("0.008", "ether"),gasPrice: self.web3.utils.toWei("0.000000007", "ether") });
			console.log("Breeding: " + id +" and " + id2 + " together!");
			console.log("(((would have)))");
		} else {
			console.log("Breeding failed. Possible cause: Too close relation");
		}
	}
	self.bothReady = function(cat, potentialPartner){
		return cat.isReady && potentialPartner.isReady;
	}

	function isEmptyObject( obj ) {
	    for ( var name in obj ) {
	        return false;
	    }
	    return true;
	}
	//Tuple describing a breeding pair
	function BreedingPair(id1, id2){
		this.id1 = id1;
		this.id2 = id2;
	}

	//function to remove element from array
	function remove(array, element){
		return array.filter(function(e) { 
	    return e !== element;
	});
	}

	self.findBreedingPairsTargeted = function(cats,targetedTraits){
		var traitLists = {}
		var newCats = [];
		for(var trait in targetedTraits){
			traitLists[targetedTraits[trait]] = [];
		}

		for(var cat in cats){
			var newKitten = GeneDecoder.simpleFilter(cats[cat],targetedTraits);
			if(!isEmptyObject(newKitten.chanceOfTrait)){
				newCats.push(newKitten);

			}
		}
		console.log("Found " + newCats.length + " filtered cats!");
		//console.log(newCats);
		return newCats;
	}

	self.findBreedingPairs = function(cats){
		var listOfUsedCats = [];
		var newCats = [];
		var breedingPairs = [];
		console.log("Looking at " + cats.length + " total cats!");

		for (var cat in cats){
			count = cat;
			cat = cats[cat];
			var potentialPartners = self.o[cat.generation];
			var potentialPartners = remove(potentialPartners, cat.id);

			var tries = 0;
			var maxTries = 100;
			matchOrTimeOut = false;
			if(cat){
				while (!matchOrTimeOut){

					var potentialPartner = potentialPartners[Math.floor(Math.random()*potentialPartners.length)];
					if (self.ck_contract.methods.canBreedWith(cat.id,potentialPartner.id) && self.bothReady(cat, potentialPartner) && (cat.id != potentialPartner.id)){
						if(!listOfUsedCats.includes(cat.id) && !listOfUsedCats.includes(potentialPartner.id)){
							breedingPairs.push(new BreedingPair(cat.id,potentialPartner.id));
							listOfUsedCats.push(cat.id);
							listOfUsedCats.push(potentialPartner.id);
							matchOrTimeOut = true;
							setTimeout(self.readyToBreedCheckA,150*count, cat.id, potentialPartner.id);
							self.o[cat.generation] = remove(self.o[cat.generation], potentialPartner.id);
							self.o[cat.generation] = remove(self.o[cat.generation], cat.id);
						}
						
					}
					tries++;
					if (tries > maxTries ){
						matchOrTimeOut = true;

					}

				}	
			}



		}
		return breedingPairs;
	}
	return self;
}

module.exports = Breeder;