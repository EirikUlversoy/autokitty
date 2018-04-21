var GeneDecoder = require("genedecoder")();
function Breeder(generations_breeding_upper_limit, upper_wallet_address, web3){
	let self = {};
	self.o = {};
	self.web3 = web3;
	self.upper_wallet_address = upper_wallet_address;
	self.generations_breeding_upper_limit = generations_breeding_upper_limit;
	//Ck_contract needs to be initialized before breeding
	self.ck_contract = null;
	self.lower_limit = 0;
	self.breedingPairScores = [];
	self.separateByGeneration = function(cats, generation){
		var filteredCatList = [];
		if(generation != 999){
			self.generations_breeding_upper_limit = generation;
			self.lower_limit = generation;

		} else {
			//return cats;
		}

		for (var kitten in cats){

			if(!self.o[cats[kitten].generation]){
				self.o[cats[kitten].generation] = [];
			}
			if(cats[kitten].generation <= self.generations_breeding_upper_limit){
				if(cats[kitten].generation >= self.lower_limit){
					self.o[cats[kitten].generation].push(cats[kitten]);
					filteredCatList.push(cats[kitten]);
				}

			}

		}
		return filteredCatList;
	}
	self.isReadyFilter = function(cats){
		let filteredCatList = [];
		for(var cat in cats){
			if(cats[cat].isReady){
				filteredCatList.push(cats[cat]);
			}
		}
		return filteredCatList;
	}
	function CatWithScore(id, score, missingTraits){
		this.id = id;
		this.score = score;
		this.missingTraits = missingTraits;
		}


	self.advancedBreedingLoop = function(cats, targetedTraits, ck_contract, generation, unchained, sixPercent){
		self.breedingPairScores = [];
		self.ck_contract = ck_contract;
		var filteredCatList = self.separateByGeneration(cats, generation);
		var readyFilteredCatList = self.isReadyFilter(filteredCatList);
		cats = readyFilteredCatList;
		console.log("Excluded not ready cats and was left with: " + readyFilteredCatList.length + " cats!");

		console.log("Excluded generations and was left with: " + filteredCatList.length + " cats!");
		//var catsWithAnyTrait = self.findBreedingPairsTargeted(filteredCatList, targetedTraits);
		

		var extraPoints = ["Bubblegum","Babypuke","Dragonfruit","Hintomint","Verdigris","Onyx","Flamingo","Bloodred",
		"Seafoam","Periwinkle"];
		var extraPoints = ["Orangesoda","Peach","Daffodil",
		"Flamingo","Cottoncandy","Dragonfruit","Hintomint","Bloodred","Seafoam","Bubblegum","Periwinkle","Verdigris"];
		extraPoints = [];
		var combinedTraits = targetedTraits.concat(extraPoints);

		var catsWithAnyTrait = self.findBreedingPairsTargeted(readyFilteredCatList, combinedTraits);

		console.log('Fitting kittens found: %d', catsWithAnyTrait.length);
		//console.log(breedingPairs);
		console.log("Account used to breed: " + self.web3.eth.defaultAccount);
		var topLists = [];
		topLists = self.createTopLists(catsWithAnyTrait,targetedTraits);

		var scores = self._scoreCatsBasedOnTraits(catsWithAnyTrait, targetedTraits, combinedTraits);
		var arrayOfScoredCats = [];
		var scoreKeys = Object.keys(scores);

		for(var key in scoreKeys){
			key = scoreKeys[key];
			//arrayOfScoredCats.push(new CatWithScore(scores[score]))
			arrayOfScoredCats.push(scores[key]);
		}
		arrayOfScoredCats.sort(self._keyComparator("score"));
		//console.log(arrayOfScoredCats);

		self.breedingPairs = self._simpleBreedingAlgorithm(cats, arrayOfScoredCats, targetedTraits, unchained, sixPercent, scores);
		self._triggerBreedingPairs(self.breedingPairs);
	}

	self._triggerBreedingPairs = function(breedingPairs){
		for(var bp in breedingPairs){
			count = bp;
			bp = breedingPairs[bp];
			setTimeout(self.readyToBreedCheckA,150*count, bp.id1, bp.id2);
		}
	}

	self._makeSingleTraitScoreDictionary = function(cats, targetedTraits){
		console.log("Making single scored lists for all traits and putting them in a dict...");
		singleTraitScoreDictionary = {};
		for(let trait in targetedTraits){
			trait = targetedTraits[trait];
			let traitScoreList = self._scoreCatsBasedOnSingleTrait(cats,trait);
			singleTraitScoreDictionary[trait] = traitScoreList;
		}
		return singleTraitScoreDictionary;

	}
	self._decideBreedOrderAndPush = function(scoredCat, partner, catDictionary){
		if(catDictionary[partner.id].cooldownIndex < catDictionary[scoredCat.id].cooldownIndex){
			self.breedingPairs.push(new BreedingPair(partner.id, scoredCat.id));
		} else {
			self.breedingPairs.push(new BreedingPair(scoredCat.id, partner.id));
		}
	}

	self._removeBreedingPairFromAllTraitLists = function(scoredCat, partner, targetedTraits){
		for(var trait in targetedTraits){
			self._removeBreedingPairFromTraitList(scoredCat, partner, targetedTraits[trait]);
		}
	}

	self._removeBreedingPairFromTraitList = function(scoredCat, partner,trait){
		var traitScoreList = self.singleTraitScoreDictionary[trait];
		delete traitScoreList[partner.id];
		delete traitScoreList[scoredCat.id];
		self.singleTraitScoreDictionary[trait] = traitScoreList;
	}

	self._decideTargetTrait = function(scoredCat, targetedTraits, catDictionary){
		var aCOF = catDictionary[scoredCat.id].chanceOfTrait;
		if(aCOF[targetedTraits[0]] > aCOF[targetedTraits[1]]){
			return targetedTraits[1];
		} else {
			return targetedTraits[0];
		}
	}
	self._findMatchZeroMissing = function(scoredCat, targetedTraits, catDictionary, treshold){
		console.log("no missing traits, pick top scorer!");
		var targetTrait = targetedTraits[0];
		if(targetedTraits.length == 2){
			targetTrait = self._decideTargetTrait(scoredCat, targetedTraits, catDictionary);
			traitScoreList = self.singleTraitScoreDictionary[targetTrait];
			orderedTraitScoreList = self._unorderedDictionaryToOrderedArrayByScore(traitScoreList);
			var partner = orderedTraitScoreList[0];
			remove(self.potentialPartners, partner.id);

			self.usedCats.push(scoredCat.id);
			self.usedCats.push(partner.id);

			self._decideBreedOrderAndPush(scoredCat, partner, catDictionary);
		} else {
			for(var partner in self.potentialPartners){
				partner = self.potentialPartners[partner];
				if(partner.id != scoredCat.id){
					if(!self.usedCats.includes(partner.id)){
						if(!self._isRelated(catDictionary[partner.id],catDictionary[scoredCat.id])){

							if(self._eitherCatIsBriskOrBetter(scoredCat, catDictionary[partner.id])){

								remove(self.potentialPartners, partner.id);
								remove(self.potentialPartners, scoredCat.id);

								self.usedCats.push(scoredCat.id);
								self.usedCats.push(partner.id);
								self._removeBreedingPairFromAllTraitLists(scoredCat, partner, targetedTraits);
								self._decideBreedOrderAndPush(scoredCat, partner, catDictionary);
								console.log("Found match in zero missing, larger than two conditional");
								console.log("Match had the score --> : " + scoredCat.score + " , " + partner.score);
								var bpscore = [];
								bpscore.push(scoredCat.score);
								bpscore.push(partner.score);
								self.breedingPairScores.push(bpscore);
								break;
							}
						}
							

					} else {
						remove(self.potentialPartners, partner.id);
					}
				}
				
			}
			
			
		}


	}

	self._fancySpecificFindPartnerLoop = function(scoredCat, potentialPartners, targetedTraits){
		for(var potentialPartner in potentialPartners){
			var potentialPartner = potentialPartners[potentialPartner];
			if(potentialPartner.id != scoredCat.id){
				var totalTraits = scoredCat.missingTraits.concat(potentialPartner.missingTraits);
				var totalTraits = totalTraits.filter(function( item, pos) {
					return totalTraits.indexOf(item) == pos});

				if(totalTraits.length == targetedTraits.length){
					return potentialPartner;
				}
			}
			
		}
	}
	self._fancySpecificOneMissing = function(scoredCat, targetedTraits, catDictionary, treshold){
		let foundPartner = self._fancySpecificFindPartnerLoop(scoredCat, self.potentialPartners, targetedTraits);
		if(foundPartner != null){
			if(catDictionary[foundPartner.id].isReady){
				remove(self.potentialPartners, scoredCat.id);
				remove(self.potentialPartners, foundPartner.id);

				self._removeBreedingPairFromAllTraitLists(foundPartner, scoredCat, targetedTraits);
				self.usedCats.push(scoredCat.id);
				self.usedCats.push(foundPartner.id);

				self._decideBreedOrderAndPush(scoredCat, foundPartner, catDictionary);
			} else {
				self.usedCats.push(foundPartner.id);
				remove(self.potentialPartners, foundPartner.id);
			}
			
			
		}
	}
	self._eitherCatIsBriskOrBetter = function(catA, catB){
		//return ((catA.cooldownIndex <= 6) || (catB.cooldownIndex <= 6));
		return true;
	}
	self._findMatchOneMissing = function(scoredCat, targetedTraits, catDictionary, scores, treshold, unchained){
		console.log("Missing one trait, pick based on top scoring cat of that trait");
		var missingTrait = scoredCat.missingTraits[0];
		var missingTraitScoreList = self.singleTraitScoreDictionary[missingTrait];
		orderedMissingTraitScoreList = self._unorderedDictionaryToOrderedArrayByScore(missingTraitScoreList);
		remove(self.potentialPartners, scoredCat.id);

		if(orderedMissingTraitScoreList.length > 0){
			for(var catInList in orderedMissingTraitScoreList){
				var partner = orderedMissingTraitScoreList[catInList];
				scoredPartner = scores[partner.id];
				if(partner.id != scoredCat.id){
					if(!self.usedCats.includes(partner.id) && !self._isRelated(catDictionary[partner.id],catDictionary[scoredCat.id])){
						if(scoredPartner.score > treshold*targetedTraits.length || unchained){
						//if(scoredPartner > 0.10 || unchained){
							if(self._eitherCatIsBriskOrBetter(scoredCat, catDictionary[partner.id])){
								if(catDictionary[partner.id].isReady){
									remove(self.potentialPartners, scoredCat.id);
									remove(self.potentialPartners, partner.id);
									self._removeBreedingPairFromAllTraitLists(scoredCat, scoredPartner, targetedTraits);
									self.usedCats.push(scoredCat.id);
									self.usedCats.push(partner.id);

									self._decideBreedOrderAndPush(scoredCat, partner, catDictionary);
									console.log("Found match in _findMatchOneMissing");
									console.log("Match had the score --> : " + scoredCat.score + " , " + scoredPartner.score);
									var bpscore = [];
									bpscore.push(scoredCat.score);
									bpscore.push(scoredPartner.score);
									self.breedingPairScores.push(bpscore);
									break;
								} else {
									self.usedCats.push(partner.id);

								}
							}
							
						}
					}
				}	

			}
		
		} else {
			console.log("No cat with the cattribute " + missingTrait + " left :(");
		}
	}
	self._isRelated = function(catA,catB){
		var statement = (catA.matronId == catB.matronId) || (catA.sireId == catB.sireId);
		return statement;
	}
	self._findMatchTwoMissing = function(scoredCat, targetedTraits, catDictionary, scores, treshold, unchained){
		console.log("Missing two traits.. Looking at both ");
		var missingTraits = scoredCat.missingTraits;
		console.log("Traits: " + missingTraits[0] + ", " + missingTraits[1]);						
		var firstMissingTraitScoreList = self.singleTraitScoreDictionary[missingTraits[0]];
		var secondMissingTraitScoreList = self.singleTraitScoreDictionary[missingTraits[1]];
		var firstOrderedTraitScoreList = self._unorderedDictionaryToOrderedArrayByScore(firstMissingTraitScoreList);
		var secondOrderedTraitScoreList = self._unorderedDictionaryToOrderedArrayByScore(secondMissingTraitScoreList);
		if(firstOrderedTraitScoreList.length > 0 && secondOrderedTraitScoreList.length > 0){
			for(var tCat in firstOrderedTraitScoreList){
				var tCat = firstOrderedTraitScoreList[tCat];
				//TODO: 0.3 magic number 
				scoredPartner = scores[tCat.id];
				if(self._eitherCatIsBriskOrBetter(scoredCat, catDictionary[tCat.id])){

					if(catDictionary[tCat.id].isReady){
						if(!self.usedCats.includes(tCat.id) && !self._isRelated(catDictionary[tCat.id],catDictionary[scoredCat.id]) && (tCat.id != scoredCat.id)){
							if(secondMissingTraitScoreList[tCat.id] > 0.20 && scoredPartner.score > targetedTraits.length * treshold ){
								remove(self.potentialPartners, scoredCat.id);
								var partner = tCat;
								remove(self.potentialPartners, partner.id);

								self._removeBreedingPairFromAllTraitLists(scoredCat, partner, targetedTraits);
								self.usedCats.push(scoredCat.id);
								self.usedCats.push(partner.id);
								self._decideBreedOrderAndPush(scoredCat, partner, catDictionary);
								console.log("Found match in _findMatchTwoMissing");
								console.log("Match had the score --> : " + scoredCat.score + " , " + scoredPartner.score);
								var bpscore = [];
								bpscore.push(scoredCat.score);
								bpscore.push(scoredPartner.score);
								self.breedingPairScores.push(bpscore);
								break;
							}
						}
						
					} else {
						self.usedCats.push(tCat.id);
					}
				}
			}
		} else {
			console.log("Both traits are not present any longer");
		}
	}

	self._fancySpecificTwoMissing = function(scoredCat, targetedTraits, catDictionary, treshold){
		let foundPartner = self._fancySpecificFindPartnerLoop(scoredCat, self.potentialPartners, targetedTraits);
		
		if(foundPartner != null){
			if(catDictionary[foundPartner.id].isReady){
				remove(self.potentialPartners, scoredCat.id);
				remove(self.potentialPartners, foundPartner.id);
				self._removeBreedingPairFromAllTraitLists(scoredCat, foundPartner);
				self.usedCats.push(scoredCat.id);
				self.usedCats.push(foundPartner.id);
				self._decideBreedOrderAndPush(scoredCat, foundPartner, catDictionary);
			} else {
				self.usedCats.push(foundPartner.id);
			}
		}
	}
	self._simpleBreedingAlgorithm = function(cats, arrayOfScoredCats, targetedTraits, unchained, sixPercent, scores){

		var catDictionary = {};
		self.breedingPairs = [];
		if(unchained == true){
			console.log("Running in unchained mode!");
		}
		for(var cat in cats){
			cat = cats[cat];
			catDictionary[cat.id] = cat;

		}
		self.singleTraitScoreDictionary = self._makeSingleTraitScoreDictionary(cats, targetedTraits);

		console.log("Trying to find find these traits:");
		console.log(targetedTraits);
		self.potentialPartners = arrayOfScoredCats.slice();

		self.usedCats = [];
		var treshold = 0.16;
		if(sixPercent){
			treshold = 0.06;
		}
		for(var scoredCat in arrayOfScoredCats){
			count = scoredCat;
			scoredCat = arrayOfScoredCats[scoredCat];
			//Assuming 1 is a good score
			//console.log(scoredCat);
			if(catDictionary[scoredCat.id].isReady){
				if(self.potentialPartners.includes(scoredCat) && !self.usedCats.includes(scoredCat.id)){
					if(scoredCat.score > treshold*targetedTraits.length){
						console.log("now trying to find a match for: " + scoredCat.id);
						if(scoredCat.missingTraits.length == 0){
							self._findMatchZeroMissing(scoredCat, targetedTraits, catDictionary, scores, treshold);
						} else if (scoredCat.missingTraits.length == 1){
							if(targetedTraits.length > 15){
								self._fancySpecificOneMissing(scoredCat, targetedTraits, catDictionary, scores, treshold);
							} else {
								self._findMatchOneMissing(scoredCat, targetedTraits, catDictionary, scores, treshold, unchained);
							}
						} else if (scoredCat.missingTraits.length == 2) {
							if(targetedTraits.length > 15){
								self._fancySpecificTwoMissing(scoredCat, targetedTraits, catDictionary, scores, treshold);
							} else {
								self._findMatchTwoMissing(scoredCat, targetedTraits, catDictionary, scores, treshold, unchained);								
							}
						} else {
							console.log("Missing three or more traits, probably should not breed this cat");
							self.usedCats.push(scoredCat.id);
						}

					}
				}

			}
			
		}
		console.log("Tried to find breeding pairs...");
		console.log("Found: " + self.breedingPairs.length + " breeding pairs!");
		for(var bpscore in self.breedingPairScores){
			console.log(self.breedingPairScores[bpscore]);			
		}
		return self.breedingPairs;
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
	self._scoreCatsBasedOnSingleTrait = function(zCats, trait){
		var catScores = {};
		for(var cat in zCats){
			if(zCats[cat]){
				var count = cat;
				cat = zCats[cat];
				var score = 0;
				if(cat.chanceOfTrait){
					var chance = cat.chanceOfTrait[trait];
				} else {
					var chance = 0;
				}
				if(chance > 0){
					score += chance;
					catScores[cat.id] = score;

				}
			}
			

		}
		return catScores;
	}


	self._scoreCatsBasedOnTraits = function(cats, targetedTraits, extraPoints){
		var catScores = {};
		//Dictionary pairing catIDs with scores.
		for(var cat in cats){
			var count = cat;
			cat = cats[cat];
			var score = 0;
			var missingTraits = [];
			for(var trait in extraPoints){
				var chance = cat.chanceOfTrait[extraPoints[trait]];
				if(chance > 0){
					if(targetedTraits.includes(extraPoints[trait])){
						score += chance;

					} else {
						score += chance*3;
					}
				} else {
					if(targetedTraits.includes(extraPoints[trait])){
						missingTraits.push(extraPoints[trait]);
					} 
				}

			}
			catScores[cat.id] = new CatWithScore(cat.id, score, missingTraits);
			//console.log(cat.chanceOfTrait);
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
			self.ck_contract.methods.breedWithAuto(id, id2).send({from: self.web3.eth.defaultAccount, value: self.web3.utils.toWei("0.008", "ether"),gasPrice: self.web3.utils.toWei("0.000000007", "ether") });
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