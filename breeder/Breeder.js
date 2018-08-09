var GeneDecoder = require("../genedecoder")();
var Comparators = require("../ak-comparators");
var Utilities = require("../utilities");
var RankingModule = require("../ranking-module")();
var fs = require("fs");
function Breeder(upper_wallet_address, web3, ck_contract){
	var TransactVerify = require('../transact-and-verify-module')(web3, ck_contract, upper_wallet_address);

	//Cat class that keeps track of both score and missing traits
	function CatWithScore(id, score, missingTraits){
		this.id = id;
		this.score = score;
		this.missingTraits = missingTraits;
	}

	//Tuple describing a breeding pair
	function BreedingPair(id1, id2, score){
		this.id1 = id1;
		this.id2 = id2;
		this.score = score;
	}

	let self = {};

	self.pureMuta = false;
	//This dictionary is used for keeping cat generations
	self.o = {};
	self.ck_contract = ck_contract;
	self.web3 = web3;
	self.upper_wallet_address = upper_wallet_address;
	//Ck_contract needs to be initialized before breeding
	self.lower_limit = 0;
	self.breedingPairScores = [];

	//PRESET BREEDING OPTIONS
	self.cats = [];
	self.targetedTraits = [];
	self.unchained = false;
	self.sixPercent = false;
	self.generations_breeding_upper_limit = 999;
	self.generations_breeding_lower_limit = 0;
	self.brisk = false;
	self.breedingPairs = [];
	self.swift = false;
	self.maxCooldown = 100;
	self.outputGeneration = function(generation){
		var catIDs = [];
		var theCats = self.o[generation];
		for(var cat in theCats){
			catIDs.push(theCats[cat]);
		}

		Utilities.saveKittenIdsSpecific(catIDs,generation);
	}

	self.toggleSwift = function(maxCooldown){
		self.maxCooldown = maxCooldown;
	}
	self.directBreedFromInput = function(pairs){
		self._triggerBreedingPairs(pairs);
	}

	self.togglePureMuta = function(mutaCount){
		self.pureMuta = true;
		self.mutaCount = mutaCount;
	}
	

	self.setupBreedingOptions = function(cats, targetedTraits,
								unchained, sixPercent
								, generations_breeding_upper_limit, generations_breeding_lower_limit, brisk){
		self.cats = cats;
		self.targetedTraits = targetedTraits;
		self.unchained = unchained;
		self.sixPercent = sixPercent;
		self.generations_breeding_upper_limit = generations_breeding_upper_limit;
		self.generations_breeding_lower_limit = generations_breeding_lower_limit;
		self.breedingPairScores = [];
		self.breedingPairs = [];
		if(brisk != undefined){
			self.brisk = brisk;
		}

	}

	self.advancedBreedingLoop = function(){
		var filteredCatList = Utilities.separateByGeneration(self.cats,self.generations_breeding_lower_limit,self.generations_breeding_upper_limit);
		console.log("Excluded generations and was left with: " + filteredCatList.length + " cats!");
		self.cats = filteredCatList;
		
		var readyFilteredCatList = Utilities.isReadyFilter(filteredCatList);
		self.cats = readyFilteredCatList;
		console.log("Excluded not ready cats and was left with: " + readyFilteredCatList.length + " cats!");

		var catsWithAnyTargetedTraits = Utilities.getCatsWithTargetTraits(GeneDecoder, self.cats, self.targetedTraits);
		self.cats = catsWithAnyTargetedTraits;
		console.log('Fitting kittens found: %d', catsWithAnyTargetedTraits.length);
		console.log("Account used to breed: " + self.web3.eth.defaultAccount);

		var RankingModule = require('../ranking-module')(self.targetedTraits, self.cats);

		//Scoring functions are needed for the breeding algorithm that follows
		var topLists = RankingModule.createTopLists(catsWithAnyTargetedTraits);
		var scores = RankingModule.scoreCatsBasedOnTraits(catsWithAnyTargetedTraits, self.targetedTraits, self.targetedTraits);
		var arrayOfScoredCats = RankingModule.getSortedArrayOfScoredCatsFromDictionary(scores);

		if(self.pureMuta){
			self.cats = readyFilteredCatList;
			//self.cats = filteredCatList;
			self.cats = GeneDecoder.filterByMutaCount(self.cats, self.mutaCount);
			RankingModule = require('../ranking-module')(self.targetedTraits, self.cats);

			self.breedingPairs = self._simpleMutaBreedingAlgorithm();
		} else {
			self.breedingPairs = self._simpleBreedingAlgorithm(arrayOfScoredCats, scores);
		}

		console.log("Full breeding pairs list: ");
		console.log(self.breedingPairs);
		self._triggerBreedingPairs(self.breedingPairs);
	}

	//This function decides which cat should be the matron by comparing their cooldowns.
	self._decideBreedOrderAndPush = function(scoredCat, partner, catDictionary, score){
		if(parseInt(catDictionary[""+partner.id].cooldownIndex,10) <= parseInt(catDictionary[""+scoredCat.id].cooldownIndex,10)){
			self.breedingPairs.push(new BreedingPair(partner.id, scoredCat.id, score));
			console.log("Picked Cat 2 as mother!");
		} else {
			self.breedingPairs.push(new BreedingPair(scoredCat.id, partner.id, score));
			console.log("Picked Cat 1 as mother!");
		}
	}

	//
	self._triggerBreedingPairs = function(breedingPairs){
		var usedBreedIds = [];

		//This is a sanity limit just in case. It also puts good limits on pure mutation runs, where there are a lot of
		//breeding pairs because there is no duplication removal (hard to do when using threads)
		if(breedingPairs.length > 3000){
			let threshold = float2int(breedingPairs.length * 0.25);
			breedingPairs = breedingPairs.slice(0,threshold);
		}

		for(var bp in breedingPairs){
			count = bp;
			bp = breedingPairs[bp];

			//This should only be relevant for pure mutation mode, where multiple pairs can have the same cats.
			//For other modes it functions as a sanity check, so it is left in place.
			if(usedBreedIds.includes(String(bp.id1)) || usedBreedIds.includes(String(bp.id2))){

			} else {
				setTimeout(TransactVerify.readyToBreedCheckA,300*count, bp.id1, bp.id2);
				usedBreedIds.push(String(bp.id1));
				usedBreedIds.push(String(bp.id2));
			}
		}
	}

	self._decideTargetTrait = function(scoredCat, targetedTraits, catDictionary){
		var aCOF = catDictionary[scoredCat.id].chanceOfTrait;
		if(aCOF[targetedTraits[0]] > aCOF[targetedTraits[1]]){
			return targetedTraits[1];
		} else {
			return targetedTraits[0];
		}
	}

	self._eitherCatIsSwiftOrBetter = function(catA, catB){
			return ((catA.cooldownIndex <= self.maxCooldown) || (catB.cooldownIndex <= self.maxCooldown));
	}

	self._eitherCatIsBriskOrBetter = function(catA, catB){
		if(self.brisk){
			return ((catA.cooldownIndex <= 1) || (catB.cooldownIndex <= 1));

		} else {
			return true;
		}
		//return true;
	}

	self._bothCatsAreBriskOrBetter = function(catA, catB){
		return true;
		if(self.brisk){
			return ((catA.cooldownIndex <= 6) || (catB.cooldownIndex <= 6));

		} else {
			return true;
		}
		//return true;
	}

	

	self.isValidMatch = function(catA, catB){
		if(!(Utilities.isRelated(catA, catB))){

			if(!self.usedCats.includes(catB.id)){

				if(self._eitherCatIsBriskOrBetter(catA, catB)){
				//if(self._bothCatsAreBriskOrBetter(catA, catB)){
					return true;
				} else {
					console.log("Was not either brisk or better?");
				}
			} else {
				console.log("was used cat?");
			}
		} else {
			console.log("was related?");
		}

		return false;
	}

	self._pureMutationChaserMulti = function(catDictionary){
		var partner = undefined;
		var processorNumber = 8;
		self.bpairs = [];
		var copyOfCats = self.cats.slice();
		var portionedCats = Utilities.chunkify(copyOfCats,processorNumber);

		var breedingPairs = [];
		var count = 0;
		var bpResults = {};
		const { fork } = require('child_process');

		for (var catPortion in portionedCats){
			const process = fork('breeder/processCats.js');

			process.on('message', (message) => {
			  console.log('BP from child');
			  breedingPairs.push(message.bp);
			  console.log("bp is: ");
			  //console.log(message.bp);
			  count += 1;
			  bpResults[count] = message;

			  if(count == processorNumber){
			  	console.log("All reported back!");
			  	console.log(bpResults);
			  	var keys = Object.keys(bpResults);
			  	for(var key in keys){
			  		let result = bpResults[keys[key]];
			  		result = result.bp;
			  		for(var breedingPair in result){
			  			self.bpairs.push(result[breedingPair])
			  		}
			  	}
			  	self._sortBreedingPairs(self.bpairs);
			  }

			});
			catPortion = portionedCats[catPortion];

			process.send({catPortion, copyOfCats, catDictionary, GeneDecoder});
		}

		//self.breedingPairs = breedingPairs;

		// receive message from master process

	}

	self._sortBreedingPairs  = function(breedingPairs){
		breedingPairs.sort(Comparators.keyComparator("score"));

		let threshold = Utilities.float2int(breedingPairs.length * 0.10);

		self.breedingPairs = breedingPairs.slice(0,threshold);
		console.log(self.breedingPairs);

		output = [];
		for (var bp in self.breedingPairs){
			bp = self.breedingPairs[bp];
			if(bp.score >= 0.067){
				output.push(bp.id1 + ',' + bp.id2 + ',' + bp.score + 'END' );
			}
		}
		fs.writeFile('kitten_pairs/saved_breeding_pairs.txt', output, (err) => {
	  	if (err) throw err;
		})

	}

	self._pureMutationChaser = function(catDictionary){
		var partner = undefined;

		self.copyOfCats = self.cats.slice();
		for(var cat in self.cats){
			//cat = self.cats[cat];
			console.log("At cat number:" + cat);
			nCat = self.cats[cat];
			var score = 0;
			mutationUnordered = RankingModule.makeMutationScoreDictionarySingularHC(catDictionary[nCat.id], self.copyOfCats, catDictionary);
			mutationOrdered = RankingModule.getSortedArrayOfScoredMutaCatsFromDictionary(mutationUnordered);
			self._printFive(mutationOrdered);
			if( mutationOrdered.length != 0){
				for(var part in mutationOrdered){
					partner = catDictionary[mutationOrdered[part][0]];
					if((self.isValidMatch(nCat, partner)) && (mutationOrdered[part][1] >= 0) && (nCat.id != partner.id)){
						console.log("is valid?");
						score = mutationOrdered[part][1];
						break;
					} else {
						partner = undefined;
					}
				}

			}
			if(partner != undefined){
				Utilities.remove(self.copyOfCats, partner.id);
				Utilities.remove(self.copyOfCats, nCat.id);
				Utilities.remove(self.cats, nCat.id);
				Utilities.remove(self.cats, partner.id);

				nCat = catDictionary[nCat.id];
				self._decideBreedOrderAndPush(nCat, partner, catDictionary, score);

				console.log("Found match in PURE MUTATION mode!");
				console.log("Match ids are: " + nCat.id + " and " + partner.id + "!");
			}
		}

		self.breedingPairs.sort(Comparators.keyComparator("score"));

		let threshold = float2int(catDetailsList.length * 0.10);

		//We only pick top 10% so that we do not breed bad pairings
		self.breedingPairs = self.breedingPairs.slice(0,threshold);
		console.log(self.breedingPairs);

	}

	

	self.processFoundBreedingPair = function(partner, scoredCat, catDictionary, missing, scores){
		Utilities.remove(self.potentialPartners, partner.id);
		Utilities.remove(self.potentialPartners, scoredCat.id);
		Utilities.remove(self.cats, scoredCat.id);
		Utilities.remove(self.cats, partner.id);
		self.usedCats.push(scoredCat.id);
		self.usedCats.push(partner.id);
		self.removeBreedingPairFromAllTraitLists(scoredCat, partner, self.targetedTraits);
		self._decideBreedOrderAndPush(scoredCat, partner, catDictionary);

		console.log("Found match in " + missing + " missing, mutation mode");
		console.log("Match had the score --> : " + scoredCat.score + " , " + scores[partner.id].score);
		var bpscore = [];
		bpscore.push(scoredCat.score);
		bpscore.push(scores[partner.id].score);
		self.breedingPairScores.push(bpscore);
	}

	

	self._findMatch = function(scoredCat, catDictionary, scores, treshold){
		if(scoredCat.missingTraits.length == 0){
			self._findMatchZeroMissing(scoredCat, catDictionary, scores, treshold);
		} else if (scoredCat.missingTraits.length == 1){
			self._findMatchOneMissing(scoredCat, catDictionary, scores, treshold);
		} else if (scoredCat.missingTraits.length == 2) {
			self._findMatchTwoMissing(scoredCat, catDictionary, scores, treshold);
		} else {
			self.usedCats.push(scoredCat.id);
		}
	}

	self._findMatchZeroMissing = function(scoredCat, catDictionary, scores, threshold){
		console.log("no missing traits, pick top scorer!");
		var targetTrait = self.targetedTraits[0];
		var genOne = false;
		if(self.targetedTraits.length == 2){
			self._mutationFindMatch(scoredCat, catDictionary, scores, threshold, 0);
		} else {
			self._customFindMatch(scoredCat, catDictionary, scores, threshold, self.potentialPartners);
		}
	}
	self._findMatchOneMissing = function(scoredCat, catDictionary, scores, treshold){
		//console.log("Missing one trait, pick based on top scoring cat of that trait");
		var missingTrait = scoredCat.missingTraits[0];
		var missingTraitScoreList = self.singleTraitScoreDictionary[missingTrait];
		orderedMissingTraitScoreList = RankingModule.unorderedDictionaryToOrderedArrayByScore(missingTraitScoreList);
		Utilities.remove(self.potentialPartners, scoredCat.id);
		var genOne = false;
		if(self.targetedTraits.length == 2){
			self._mutationFindMatch(scoredCat, catDictionary, scores, treshold, 1);
		} else {
			self._customFindMatch(scoredCat, catDictionary, scores, threshold, orderedMissingTraitScoreList);
		}

	}

	self.removeBreedingPairFromAllTraitLists = function(scoredCat, partner, targetedTraits){
		for(var trait in targetedTraits){
			self.removeBreedingPairFromTraitList(scoredCat, partner, targetedTraits[trait]);
		}
	}

	self.removeBreedingPairFromTraitList = function(scoredCat, partner,trait){
		var traitScoreList = self.singleTraitScoreDictionary[trait];
		delete traitScoreList[partner.id];
		delete traitScoreList[scoredCat.id];
		self.singleTraitScoreDictionary[trait] = traitScoreList;
	}

	self._mutationFindMatch = function(scoredCat, catDictionary, scores, treshold, missing){
		var partner = undefined;
		var extreme = false;
		var targetScore = 0.10;
		if(Utilities.anyTraitInListIsExtreme(self.targetedTraits)){
			extreme = true;
		}

		if(Utilities.anyTraitInListIsRare(self.targetedTraits)){
			targetScore = 0.015;
		}
		
		if(parseInt(catDictionary[scoredCat.id].generation,10) > 0){
			targetScore = 0.30;
		}
		if(missing == 0){
			targetTrait = self._decideTargetTrait(scoredCat, self.targetedTraits, catDictionary);
		} else if (missing == 1){
			var targetTrait;
			var real_cat = catDictionary[scoredCat.id];
			if(self.targetedTraits[0] in real_cat.chanceOfTrait){
				targetTrait = self.targetedTraits[1];
			} else {
				targetTrait = self.targetedTraits[0];
			}
		}

		traitScoreList = self.singleTraitScoreDictionary[targetTrait];

		orderedTraitScoreList = RankingModule.unorderedDictionaryToOrderedArrayByScore(traitScoreList);
		mutationUnordered = RankingModule.makeMutationScoreDictionarySingular(catDictionary[scoredCat.id],orderedTraitScoreList, catDictionary);
		mutationOrdered = RankingModule.getSortedArrayOfScoredMutaCatsFromDictionary(mutationUnordered, self.cats);

		if(mutationOrdered.length != 0){
			for(var partner in mutationOrdered){
				partner = catDictionary[mutationOrdered[partner][0]];
				if((partner.chanceOfTrait[targetTrait] > targetScore) || extreme){
					if(self.isValidMatch(scoredCat, partner) && mutationOrdered[0][1] >= 0.0){
						if(self.maxCooldown < 100){
							if(self._eitherCatIsSwiftOrBetter(scoredCat, partner)){
								break;
							} else {
								partner = undefined;
							}
						} else {
							break;
						}
					} else {
						partner = undefined;
					}
				} else {
					partner = undefined;
				}
			}

		}

		if(partner != undefined){
			self.processFoundBreedingPair(partner, scoredCat, catDictionary, missing, scores);
		}
	}
	
	self._customFindMatch = function(scoredCat, catDictionary, scores, threshold, partnerList){
		var partnerCopy = self.potentialPartners.slice();
		for(var partner in partnerCopy){
			partner = partnerCopy[partner];
			scoredPartner = scores[partner.id];
			if(partner.id != scoredCat.id){
				if(!(self.usedCats.includes(partner.id))){
					if(!(Utilities.isRelated(catDictionary[partner.id],catDictionary[scoredCat.id]))){
						if(scoredPartner.score > treshold*self.targetedTraits.length || self.unchained){
							if(self._eitherCatIsBriskOrBetter(scoredCat, catDictionary[partner.id])){
								if(catDictionary[partner.id].isReady){
									Utilities.remove(self.potentialPartners, partner.id);
									Utilities.remove(self.potentialPartners, scoredCat.id);
									Utilities.remove(self.cats, scoredCat.id);
									Utilities.remove(self.cats, partner.id);
									self.usedCats.push(scoredCat.id);
									self.usedCats.push(partner.id);
									self.removeBreedingPairFromAllTraitLists(scoredCat, partner, self.targetedTraits);
									self._decideBreedOrderAndPush(scoredCat, partner, catDictionary);
									console.log("Found match in zero missing, larger than two conditional");
									console.log("Match had the score --> : " + scoredCat.score + " , " + partner.score);
									var bpscore = [];
									bpscore.push(scoredCat.score);
									bpscore.push(partner.score);
									self.breedingPairScores.push(bpscore);
									break;
								} else {
									self.usedCats.push(partner.id);
									//Utilities.remove(self.potentialPartners, partner.id);
								}

							}
						}
					}


				} else {
					Utilities.remove(self.potentialPartners, partner.id);
				}
			}

		}


	}

	self._findMatchTwoMissing = function(scoredCat, catDictionary, scores, treshold){
		//console.log("Missing two traits.. Looking at both ");

		if(self.targetedTraits.length == 2){
			console.log("Not doing singular partners for mutations..");
		} else {
			var missingTraits = scoredCat.missingTraits;
			//console.log("Missing traits: " + missingTraits[0] + ", " + missingTraits[1]);
			var firstMissingTraitScoreList = self.singleTraitScoreDictionary[missingTraits[0]];
			var secondMissingTraitScoreList = self.singleTraitScoreDictionary[missingTraits[1]];
			var firstOrderedTraitScoreList = RankingModule.unorderedDictionaryToOrderedArrayByScore(firstMissingTraitScoreList);
			var secondOrderedTraitScoreList = RankingModule.unorderedDictionaryToOrderedArrayByScore(secondMissingTraitScoreList);

			//If there are cats that have both traits remaining
			if(firstOrderedTraitScoreList.length > 0 && secondOrderedTraitScoreList.length > 0){
				for(var tCat in firstOrderedTraitScoreList){
					var tCat = firstOrderedTraitScoreList[tCat];
					scoredPartner = scores[tCat.id];
					if(self._eitherCatIsBriskOrBetter(scoredCat, catDictionary[tCat.id])){

						if(catDictionary[tCat.id].isReady){
							if(!(self.usedCats.includes(tCat.id)) && !(Utilities.isRelated(catDictionary[tCat.id],catDictionary[scoredCat.id])) && (tCat.id != scoredCat.id)){
								if(secondMissingTraitScoreList[tCat.id] > 0.20 && scoredPartner.score > self.targetedTraits.length * treshold ){
									Utilities.remove(self.potentialPartners, scoredCat.id);
									var partner = tCat;
									Utilities.remove(self.potentialPartners, scoredPartner.id);
									Utilities.remove(self.cats, scoredCat.id);
									Utilities.remove(self.cats, scoredPartner.id);
									self.removeBreedingPairFromAllTraitLists(scoredCat, scoredPartner, self.targetedTraits);
									self.usedCats.push(scoredCat.id);
									self.usedCats.push(scoredPartner.id);
									self._decideBreedOrderAndPush(scoredCat, scoredPartner, catDictionary);
									//console.log("Found a candidate match in _findMatchTwoMissing");
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
				console.log("Neither trait is present");
			}
		}

	}

	self._simpleMutaBreedingAlgorithm = function(){
		var multiTest = true;
		var catDictionary = {};
		self.usedCats = [];

		for(var cat in self.cats){
			cat = self.cats[cat];
			catDictionary[cat.id] = cat;
		}

		if(multiTest){
			self._pureMutationChaserMulti(catDictionary);
		} else {
			self._pureMutationChaser(catDictionary);
		}


		return self.breedingPairs;
	}

	self._simpleBreedingAlgorithm = function(arrayOfScoredCats, scores){

		var catDictionary = {};
		if(self.unchained == true){
			console.log("Running in unchained mode!");
		}
		for(var cat in self.cats){
			cat = self.cats[cat];
			catDictionary[cat.id] = cat;

		}
		self.singleTraitScoreDictionary = RankingModule.makeSingleTraitScoreDictionary(self.targetedTraits, self.cats);
		console.log("Trying to find find these traits:");
		console.log(self.targetedTraits);
		self.potentialPartners = arrayOfScoredCats.slice();

		self.usedCats = [];
		var treshold = 0.15;
		if(self.sixPercent){
			treshold = 0.03;
		}
		for(var scoredCat in arrayOfScoredCats){
			scoredCat = arrayOfScoredCats[scoredCat];
			if(self._isSuitableCat(scoredCat, catDictionary, treshold)){

				if(!(self.usedCats.includes(scoredCat.id))){
					self._findMatch(scoredCat, catDictionary, scores, treshold);
				}
			}

		}
		console.log("Tried to find breeding pairs...");
		console.log("Found: " + self.breedingPairs.length + " breeding pairs!");
		console.log("Their scores are:");

		for(var bpscore in self.breedingPairScores){
			console.log(self.breedingPairScores[bpscore]);
		}
		return self.breedingPairs;
	}

	//Checks for the cat being ready, being in potentialpartners and that it is not in the usedCats list.
	//Also matches versus the treshold.
	self._isSuitableCat = function(scoredCat, catDictionary, treshold){
		if(catDictionary[scoredCat.id].isReady){
			if(self.potentialPartners.includes(scoredCat) && !self.usedCats.includes(scoredCat.id)){
				if(scoredCat.score > treshold*self.targetedTraits.length){
					//console.log("Cat: " + scoredCat.id + " exceeds threshold and is suitable! Trying to find a match!");
					return true;
				}
			}

		}
		return false;
	}
	

	return self;
}

module.exports = Breeder;
