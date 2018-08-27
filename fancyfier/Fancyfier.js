var GeneDecoder = require("../genedecoder")();
var Comparators = require("../ak-comparators");
var Utilities = require("../utilities");
var Combinatorics = require("js-combinatorics");

function Fancyfier(upper_wallet_address, web3, ck_contract, targeted_traits, dominantCount){
	self = {};
	self.dominantCount = dominantCount;
	self.total_targeted_traits = targeted_traits;
	self.current_targeted_traits = self.total_targeted_traits;
	self.allBreedingPairLists = [];
	self.catOutput = false;
	self.fancyOnFancyBanned = false;
	self.useDefaultDict = true;
	self.defaultDict = {};
	self.defaultDict[0] = 0.02;
	self.defaultDict[1] = 0.005;
	self.defaultDict[2] = 0.02;
	self.defaultDict[3] = 0.03;
	self.defaultDict[4] = 0.05;
	self.defaultDict[5] = 0.08;
	self.defaultDict[6] = 0.18;
	self.longshotMutations = true;
	//Needs to be global to avoid conflicts
	self.usedCats = [];
	var Breeder = require("../breeder")(upper_wallet_address, web3, ck_contract);

	self.catDict = {};

	//Needed to call the starting function from outside while still keeping the other functions internal
	self.mainStarter = function(gen_from, gen_to, cats){
		cats = isReadyFilter(cats);
		for (var cat in cats){
			self.catDict[cats[cat].id] = cats[cat];
		}
		//cats = GeneDecoder.filterByDominantCount(cats, self.total_targeted_traits, self.dominantCount);
		cats = GeneDecoder.filterByR1Count(cats, self.total_targeted_traits, self.dominantCount);
		main(gen_from, gen_to, cats);

	}

	function isReadyFilter(cats) {
		let filteredCatList = [];
		for(var cat in cats){
			if(cats[cat].isReady){
				filteredCatList.push(cats[cat]);
			}
		}
		return filteredCatList;
	}
	//The main function
	function filterBreedingListByPercentage(percentage, breedingList){
		new_breeding_list = [];
		for (var x in breedingList){
			x = breedingList[x];
			let catA = self.catDict[x.id1];
			let catB = self.catDict[x.id2];
			score = scoreCatPair(catA, catB, self.total_targeted_traits);
			if(score < percentage){
				console.log("Will not breed: Below percentage limit of -> " + percentage);
				console.log("Score was only:" + score);

			} else {
				console.log("Will breed!");
				console.log("Score was: " + score);
				new_breeding_list.push(x);
			}
		}
		return new_breeding_list;
	}
	function main(gen_from, gen_to, cats){
		cats = isReadyFilter(cats);
		var stageList = designStages(gen_from, gen_to, cats, 1);

		for(var stage in stageList){
			stageNumber = stage;
			stage = stageList[stage];
			var breedingPairs = stage.solve();
			self.allBreedingPairLists.push(breedingPairs);
			console.log("Finished stage number: " + stageNumber)
			//console.log(breedingPairs);

		}
		var catAmount = 0;
		for(var x in self.allBreedingPairLists){
				catAmount += self.allBreedingPairLists[x].length;
		}

		for(var x in self.allBreedingPairLists){
			console.log("Breeding pairs in stage:" + x + " --- " + self.allBreedingPairLists[x].length);
			console.log("Sample cats have this fancy chance:");
			if(self.allBreedingPairLists[x].length > 0){
				var catA = self.catDict[self.allBreedingPairLists[x][0].id1];
				var catB = self.catDict[self.allBreedingPairLists[x][0].id2];
				console.log(scoreCatPair(self.catDict[self.allBreedingPairLists[x][0].id1],self.catDict[self.allBreedingPairLists[x][0].id2],self.total_targeted_traits));
				console.log(self.allBreedingPairLists[x][0].id1);
				console.log(self.allBreedingPairLists[x][0].id2);
			} else {
				console.log("No sample cat ");
			}
			if(catAmount < 500){
				if(self.useDefaultDict && self.allBreedingPairLists[x].length > 0){
					new_breeding_list = filterBreedingListByPercentage(self.defaultDict[catA.generation], self.allBreedingPairLists[x]);
					Breeder._triggerBreedingPairs(new_breeding_list);					
				} else {
					new_breeding_list = filterBreedingListByPercentage(0.10, self.allBreedingPairLists[x]);
					Breeder._triggerBreedingPairs(new_breeding_list);					
				}
			}

		}
	}

	function BreedingPair(id1, id2, score){
		this.id1 = id1;
		this.id2 = id2;
		this.score = score;
	}

	//This designs the stages
	function designStages(gen_from, gen_to, cats, startLevel){
		var stageList = [];
		var amount = self.total_targeted_traits.length;
		var counter = 1;
		self.catDictionary = {};

		//Making a cat-dictionary to keep track of attributes such as cooldown, matron, sire, time until next breed, etc.
		for(var cat in cats){
			cat = cats[cat];
			self.catDictionary[cat.id] = cat;
		}
		var traitLevel = startLevel;
		//Need to go through the stage making procedure for each generation
		for(var x = gen_from; x <= gen_to; x++){

			//Gets the traitcombinations in a list, used in the next step
			var listOfTargetedTraitCombinations = selectTargetTraits(traitLevel+2);
			
			//Threshold, increases with gen number. 
			var threshold = 0.10;
			console.log(x);
			if(x > 4){
				threshold = 0.30;
			}

			if(x >= 6){
				threshold = 0.30;
			}

			//Multi threshold
			var multiplicative_threshold = 0.20;//(0.005*counter);
			
			//One stage for each of the traitcombinations
			for(var y = 0; y < listOfTargetedTraitCombinations.length; y++){
				var generationFilteredCats = catGenerationFilter(cats, x);
				//generationFilteredCats = cats;
				var stage = new Stage(x, generationFilteredCats, listOfTargetedTraitCombinations[y], threshold, self.total_targeted_traits, multiplicative_threshold);
				stageList.push(stage);

				//Output regarding stage generation
				console.log("Designed stage: GEN-"+x + " NUMBER-"+y);
				console.log("Which is stage number: " + counter);
				console.log(listOfTargetedTraitCombinations[y]);
				console.log("It has " + generationFilteredCats.length + "cats!");
				console.log("---------------------------------------------");
			}

			//Only increase the trait level if we are not at the max level (hardcoded for now)
			if(traitLevel != self.total_targeted_traits.length-2){
				traitLevel += 1;
			}
			//counter += 1;

		}
		return stageList;
	}


	function selectTargetTraits(amount){
		total_targeted_traits = self.total_targeted_traits;

		generator = Combinatorics.combination(total_targeted_traits,amount);
		var listOfTraitCombinations = [];

		while(a = generator.next()) listOfTraitCombinations.push(a);
		return listOfTraitCombinations; 
	}
	//This function selects the trait combinations

	//Each stage is one iteration over a set of cats where pairs are picked according to thresholds and targeted traits. They are supposed to be self-contained.
	function Stage(generation, cats, current_targeted_traits, threshold, total_targeted_traits, multiplicative_threshold){
		this.multiplicative_threshold = multiplicative_threshold;
		this.generation = generation;
		this.cats = cats;
		this.total_targeted_traits = total_targeted_traits;
		this.threshold = threshold;
		this.current_targeted_traits = current_targeted_traits;
		this.threshold_modified = threshold;
		this.stopOnNext = false;

		//Avoiding too high of a threshold, might be modified after more testing
		/*
		if(this.threshold_modified > 0.20){
			this.threshold_modified = 0.20;
		}*/

		//This is where the end results will be stored
		this.breedingPairs = [];
		console.log("Treshold is: " + this.threshold_modified);
		this.resetStage = function(){
			this.breedingPairs = [];
		}
		this.meetsThreshold = function(catA){
				return catA.score > this.threshold_modified;
		}

		function float2int (value) {
	    return value | 0;
		}
		this.solve = function(){
			//this.cats = GeneDecoder.filterByDominantCount(this.cats, total_targeted_traits, self.dominantCount);
			//This calls the function that scores all cats according to some given traits. It uses total targeted traits to avoid missing good matches, despite the stage maybe not having all of the traits.
			const listOfScoredCats = scoreAllCats(this.cats, this.threshold_modified, this.total_targeted_traits);
			
			//Only used to save kitten IDs, does not need to run often
			Utilities.saveKittenIdsSpecific(listOfScoredCats, this.generation);


			//Making a copy of the scored cat list
			var potentialCatPartners = listOfScoredCats.slice();
			console.log("Now solving a stage that uses generation: " + this.generation);
			for(var cat in listOfScoredCats){
				number = cat;
				cat = listOfScoredCats[cat];
				new_cat = undefined;
				//First threshold check, this should filter out a lot of cats
				if(this.meetsThreshold(cat)){

					//This calls a function that provides an arrayList of missingtraits(by name)
					missingTraits = getMissingTraits(cat.cat, this.current_targeted_traits);  
					//Here the first missing trait is used to make a toplist of the copy of the cat list that we made earlier. For now it picks the first one, optimally it should choose the best missing trait or
					//account for both.
					var reagentLists = [];
					var topLists = [];
					var finalFirstReagents = [];
					var finalSecondReagents = [];
					var finalMutations = [];
					if(missingTraits.length != 0 && missingTraits.length < 4){
						var firstReagents = [];
						var secondReagents = [];
						var mutations = [];

						for(var mTrait in missingTraits){
							topList = createSingleTopList(potentialCatPartners, missingTraits[mTrait]);
							topLists.push(topList);
							if(self.longshotMutations){
								let mutationDicts = require('../mutation-dictionary-module')().setupDictionaries();

								for(let m in mutationDicts){
									dictionary = mutationDicts[m];
									if(dictionary[missingTraits[mTrait]] != undefined){
										firstReagents.push(dictionary[missingTraits[mTrait]][0]);
										secondReagents.push(dictionary[missingTraits[mTrait]][1]);
										mutations.push(missingTraits[mTrait]);
										
									}

								}
							}
							
						}
						if(self.longshotMutations){
							for(var mutationNr in mutations){
							if(firstReagents[mutationNr] != undefined && secondReagents[mutationNr] != undefined){
								targeted_traits = [];
								targeted_traits = this.current_targeted_traits.slice();
								targeted_traits.push(firstReagents[mutationNr]);
								targeted_traits.push(secondReagents[mutationNr]);
								targeted_traits = Utilities.remove(targeted_traits, mutations[mutationNr]);

								if(String(cat.id) == "713586"){
									console.log(targeted_traits);
								}
								var reagentOneScoredCats = createSingleTopList(potentialCatPartners, firstReagents[mutationNr]);
								var reagentTwoScoredCats = createSingleTopList(potentialCatPartners, secondReagents[mutationNr]);
								//reagentOneScoredCats = [];
								//reagentTwoScoredCats = [];
								//var scoreOne = scoreCat(cat.cat, 0.30, [firstReagents[mTrait]]);
								//var scoreTwo = scoreCat(cat.cat, 0.30, [secondReagents[mTrait]]);
								//scoreOne = 1;
								//scoreTwo = 1;
								var scoreOne = 0;
								var scoreTwo = 0;
								if(cat.cat.chanceOfTrait[firstReagents[mutationNr]] != undefined){
									scoreOne = cat.cat.chanceOfTrait[firstReagents[mutationNr]];
								}

								if(cat.cat.chanceOfTrait[secondReagents[mutationNr]] != undefined){
									scoreTwo = cat.cat.chanceOfTrait[secondReagents[mutationNr]];
								}
								if( scoreOne > 0.30 || scoreTwo > 0.30){
									if(scoreOne > scoreTwo){
										if(String(cat.id) == "713586"){
											console.log("Pushing a reagent list for " + mutations[mutationNr]);
											console.log(firstReagents[mutationNr]);
											console.log(secondReagents[mutationNr]);
										}
										finalFirstReagents.push(firstReagents[mutationNr]);
										finalSecondReagents.push(secondReagents[mutationNr]);
										finalMutations.push(mutations[mutationNr]);
										reagentLists.push(reagentTwoScoredCats);
									} else {
										if(String(cat.id) == "713586"){
											console.log("Pushing a reagent list for " + mutations[mutationNr]);
											console.log(firstReagents[mutationNr]);
											console.log(secondReagents[mutationNr]);
										}
										reagentLists.push(reagentOneScoredCats);
										finalFirstReagents.push(firstReagents[mutationNr]);
										finalSecondReagents.push(secondReagents[mutationNr]);
										finalMutations.push(mutations[mutationNr]);
									}
								}
							}
						}
						
						}
						
						
					} else {
						topLists.push(potentialCatPartners);
					}
					//Iterating over the toplist we just made trying to find a suitable partner
					for(var tList in topLists){
						topList = topLists[tList];
						for(var partnerCat in topList){

							if(missingTraits.length != 0){
								partnerCat = topList[partnerCat];
							} else {
								partnerCat = topList[partnerCat].cat;
							}

							// Two checks on this line, both checks if traits requirements are met (for each trait, either cat is over the threshold, if not -> false)
							//Second check is a check for whether each cat has at least two dominant traits of the targeted traits

							if(partnerCat.cat != undefined){
								partnerCat = partnerCat.cat;
							}
							if(traitRequirementsMet(cat.cat, partnerCat, this.current_targeted_traits, this.threshold_modified) && noFancyOnFancyRequirement(cat.cat, partnerCat, this.total_targeted_traits, this.threshold_modified)){
								
								//This function call does three checks, for speed, relation and whether either cat is already used. Lots of cats are filtered out here.
								let swift = false;
								var specific_fancy = ["Ganado","Wiley","Cerulian","Rollercoaster"];
								if(isValidMatch(cat.cat, partnerCat, self.usedCats, swift) && notSpecificFancyCheck(cat.cat, partnerCat, specific_fancy)){

									//Picks the correct (fastest) mother
									var breedingPair = decideParentRoles(cat.cat, partnerCat, self.catDictionary);
									chanceOfFancy = scoreCatPair(cat.cat, partnerCat, this.total_targeted_traits);

									if(self.catOutput){
										//Output for the breeding pair
										console.log("Cat 1: ");
										console.log(cat.cat.chanceOfTrait);
										console.log(cat.id);
										console.log("Cat 2:");
										console.log(partnerCat.chanceOfTrait);
										console.log(partnerCat.id);
										console.log("CHANCE OF FANCY: " + chanceOfFancy);
									}
									

									//Using the multiplicative threshold as a second check
									if(chanceOfFancy >= this.multiplicative_threshold){

										this.breedingPairs.push(breedingPair);
										self.usedCats.push(cat.id);
										self.usedCats.push(partnerCat.id);
										break;
									} else {
										if(self.catOutput){
											console.log("Did not pass multiplicative_threshold!");
											console.log(chanceOfFancy);
										}
									}
									if(self.catOutput){
										console.log("------------------------------------------------------");
									}

									
								}
							} else {

							}

							
						}
					}
					if(self.longshotMutations){
						self.reagentLoop = function(reagentList, firstReagent, secondReagent, mutation, ca, multiplicative_threshold){
						if(String(cat.id) == "713586"){
							console.log(mutation);
							console.log("^ current mutation");
						}
						for(var partnerCat in reagentList){
							partnerCat = reagentList[partnerCat];
							targeted_traits = [];
							targeted_traits = self.total_targeted_traits.slice();
							targeted_traits.push(firstReagent);
							targeted_traits.push(secondReagent);
							targeted_traits = Utilities.remove(targeted_traits, mutation);

							if(String(cat.id) == "713586" && String(partnerCat.id) == "680079"){
								console.log(firstReagent);
								console.log(secondReagent);
								console.log(mutation);
								console.log(cat);
								console.log(partnerCat);
								console.log(traitRequirementsMet(cat.cat, partnerCat, targeted_traits,0));
								console.log(targeted_traits);
								console.log(noFancyOnFancyRequirement(cat.cat,partnerCat, self.total_targeted_traits, 0));
								for(var trait in targeted_traits){
									trait = targeted_traits[trait];
									if(cat.cat.chanceOfTrait[trait] > 0.02 || partnerCat.chanceOfTrait[trait] > 0.02){
										console.log("Success for trait: " + trait);
										console.log(cat.cat.chanceOfTrait[trait]);
										console.log(partnerCat.chanceOfTrait[trait]);

									} else {
										console.log("Failure for trait: " + trait);
										console.log(cat.cat.chanceOfTrait[trait]);
										console.log(partnerCat.chanceOfTrait[trait]);
									}
								}
							}
							//console.log("reagent in reagentlist");
							// Two checks on this line, both checks if traits requirements are met (for each trait, either cat is over the threshold, if not -> false)
							//Second check is a check for whether each cat has at least two dominant traits of the targeted traits
							if(traitRequirementsMet(cat.cat, partnerCat, targeted_traits, 0) && noFancyOnFancyRequirement(cat.cat, partnerCat, self.total_targeted_traits, 0)){
								//This function call does three checks, for speed, relation and whether either cat is already used. Lots of cats are filtered out here.
								let swift = false;
								var specific_fancy = ["Ganado","Wiley","Cerulian","Rollercoaster"];
								if(isValidMatch(cat.cat, partnerCat, self.usedCats, swift) && notSpecificFancyCheck(cat.cat, partnerCat, specific_fancy)){

									//Picks the correct (fastest) mother
									var breedingPair = decideParentRoles(cat.cat, partnerCat, self.catDictionary);
									chanceOfFancy = scoreCatPair(cat.cat, partnerCat, targeted_traits)*0.25;

									if(self.catOutput){
										//Output for the breeding pair
										console.log("Cat 1: ");
										console.log(cat.cat.chanceOfTrait);
										console.log(cat.id);
										console.log("Cat 2:");
										console.log(partnerCat.chanceOfTrait);
										console.log(partnerCat.id);
										console.log("CHANCE OF FANCY: " + chanceOfFancy);
									}
									

									//Using the multiplicative threshold as a second check
									if(chanceOfFancy >= multiplicative_threshold){
										self.usedCats.push(cat.id);
										self.usedCats.push(partnerCat.id);
										return breedingPair;

										break;
									} else {
										if(self.catOutput){
											console.log("Did not pass multiplicative_threshold!");
											console.log(chanceOfFancy);
										}
									}
									if(self.catOutput){
										console.log("------------------------------------------------------");
									}

									
								}
							} else {

							}
						}
					}
					
					}
					if(self.longshotMutations){
						for(var rList in reagentLists){
							var breedingPair = self.reagentLoop(reagentLists[rList], finalFirstReagents[rList], finalSecondReagents[rList], finalMutations[rList], cat, this.multiplicative_threshold);
							if(breedingPair != undefined){
								this.breedingPairs.push(breedingPair);
							}
						}
					}


				}

			}

			

			if(this.stopOnNext){
				return this.breedingPairs;
			}
			//This is the final result of solving the stage
			if(this.breedingPairs.length > 5 || this.multiplicative_threshold < 0.002){
				return this.breedingPairs;
				this.stopOnNext = true;
				let toReduce = (this.multiplicative_threshold * 0.20);
				console.log("Found a match, reducing further by "+ toReduce + " to find some more matches");
				this.multiplicative_threshold -= toReduce;
				this.threshold_modified -= 0.02;
				return this.solve();
			} else {
				//this.multiplicative_threshold -= 0.01;
				let toReduce = (this.multiplicative_threshold * 0.20);
				console.log("no matches, reducing threshold by"+ toReduce + " to find a match");
				this.multiplicative_threshold -= toReduce;
				this.threshold_modified -= 0.02;
				//this.multiplicative_threshold -= 0.03;
				console.log("New threshold is " + this.multiplicative_threshold)
				return this.solve();
			}
			return this.breedingPairs;
		}

	}


	function eitherCatIsSwiftOrBetter(catA, catB){
		if(parseInt(catA.generation,10) > 20){
			return true;
		} else {
			return ((parseInt(catA.cooldownIndex,10) <= 6) || (parseInt(catB.cooldownIndex,10) <= 6));
		}
	}

	//Picks the correct mother (fastest)
	function decideParentRoles(cat, catPartner, catDictionary, score){
		if(parseInt(catDictionary[""+catPartner.id].cooldownIndex,10) <= parseInt(catDictionary[""+cat.id].cooldownIndex,10)){
			var bp = new BreedingPair(catPartner.id, cat.id, score);
			return bp;
		} else {
			var bp = new BreedingPair(cat.id, catPartner.id, score);
			return bp;
		}
	}

	//Creates a toplist based on a given trait string. Sorts it from top to bottom.
	function createSingleTopList(cats, trait){
		var topList = [];
		for(var cat in cats){
			cat = cats[cat];
			if(cat.cat.chanceOfTrait[trait]){
				topList.push(cat.cat);
			}

		}
		if(topList.length > 0){
			topList.sort(Comparators.traitScoreComparator(trait));
		}
		return topList;
	}

	function createSingleTopListShallow(cats, trait){
		var topList = [];
		for(var cat in cats){
			cat = cats[cat];
			if(cat.chanceOfTrait[trait]){
				topList.push(cat);
			}

		}
		if(topList.length > 0){
			topList.sort(Comparators.traitScoreComparator(trait));
		}
		return topList;
	}

	//Helper object to package a score value with the cat. The ID is added to make it backwards compatible with some other functions and modules.
	function CatWithScore(id, cat, score){
		this.id = id;
		this.cat = cat;
		this.score = score;
	}

	//Filters cats based on generation
	function catGenerationFilter(cats, generation){

		var filteredCatList = cats.filter(function (el) {
		return parseInt(el.generation,10) == generation;
	});
	return filteredCatList;

	}

	//Scores all cats based on given traits and threshold. 
	function scoreAllCats(cats,threshold_modifier, current_targeted_traits, deeper){

		var listOfScoredCats = [];
		for(var cat in cats){
			if(deeper != undefined){
				cat = cats[cat].cat;
			} else {
				cat = cats[cat];
			}
			//This call to the GeneDecoder module adds a chanceOfTrait dictionary to each kitten, which we use a lot throughout this module.
			kittenWithTraits = GeneDecoder.simpleFilter(cat, current_targeted_traits);

			//Scoring the cat, now that we have the trait scores.
			score = scoreCat(kittenWithTraits, threshold_modifier, current_targeted_traits);
			//Only adding the cat if the score is above 0, helps us filter out cats early. Can add more aggressive filtering here.
			if(score > 0 && kittenWithTraits.chanceOfTrait != undefined && Object.keys(kittenWithTraits.chanceOfTrait).length > 0){
				listOfScoredCats.push(new CatWithScore(kittenWithTraits.id, kittenWithTraits, score));
			}

		}

		//Sort based on score (all traits added up)
		listOfScoredCats.sort(Comparators.keyComparator("score"));
		return listOfScoredCats;
	}

	//If a trait is under 0.20 in score (0.33 is dominant and ~0.11 is R1), the trait is considered missing. A bit strict. Returns a list of strings.
	function getMissingTraits(cat, targeted_traits){
		var missingTraits = [];
		for(var trait in targeted_traits){
			trait = targeted_traits[trait];
			if(cat.chanceOfTrait[trait] != undefined){
				if(cat.chanceOfTrait[trait] < 0.20){
					missingTraits.push(trait);
				}
			} else {
				missingTraits.push(trait);
			}

		}
		return missingTraits;
	}

	//Scoring a cat based on trait scores
	function scoreCat(cat, threshold_modifier, current_targeted_traits){
		var threshold_met = false;
		var score = 0;
		for(var trait in current_targeted_traits){
			trait = current_targeted_traits[trait];

			if(cat.chanceOfTrait[trait] > 0.000){
				score += cat.chanceOfTrait[trait];
			}
		}

		return score;

	}

	//Final multiplicative scoring function
	function scoreCatPair(catA, catB, targeted_traits){
		let traitScores = [];
		for(let trait in targeted_traits){
			traitScores.push(1);
		}
		catA1 = Object.create(catA);
		catB1 = Object.create(catB);
		//Grabbing traits. This is done so that the scoreCatPair function can be called from anywhere without any requirements except for the cat objects and the targeted_traits list
		kittenWithTraitsA = GeneDecoder.simpleFilter(catA1, targeted_traits);
		kittenWithTraitsB = GeneDecoder.simpleFilter(catB1, targeted_traits);

		for(var trait in targeted_traits){
			traitNumber = trait;
			trait = targeted_traits[trait];

			if(kittenWithTraitsA.chanceOfTrait[trait]){
				traitScores[traitNumber] += kittenWithTraitsA.chanceOfTrait[trait];
			}
			if(kittenWithTraitsB.chanceOfTrait[trait]){
				traitScores[traitNumber] += kittenWithTraitsB.chanceOfTrait[trait];
			}
			traitScores[traitNumber] -= 1;
			if(traitScores[traitNumber] <= 0){
				traitScores[traitNumber] = 1;
			}

		}
		let totalScore = 1;
		for(let traitScore in traitScores){
			totalScore *= traitScores[traitScore];
		}


		return totalScore;
	}

	//Checks if each cat has at least two dominant traits of the targeted traits
	function twoDominantRequirement(catA, catB, current_targeted_traits, threshold){
		//return true;
		let catACount = 0;
		let catBCount = 0;
		for(var trait in current_targeted_traits){
			trait = current_targeted_traits[trait];
			if(catA.chanceOfTrait[trait] > 0.30){
				catACount += 1;
			}
			if(catB.chanceOfTrait[trait] > 0.30){
				catBCount += 1;
			}
		}

		//return catACount >= self.dominantCount && catBCount >= self.dominantCount;
		return catACount >= 1 || catBCount >= 1;

	}

		function notSpecificFancyCheck(catA, catB, fancy_traits){
				//return true;
			if(self.fancyOnFancyBanned == false){
				return true;
			}
			let catACount = 0;
			let catBCount = 0;
			for(var trait in fancy_traits){
				trait = fancy_traits[trait];
				if(catA.chanceOfTrait[trait] > 0.30){
					catACount += 1;
				}
				if(catB.chanceOfTrait[trait] > 0.30){
					catBCount += 1;
				}
			}
			return catACount < fancy_traits.length && catBCount < fancy_traits.length;

		}
		function noFancyOnFancyRequirement(catA, catB, current_targeted_traits, threshold){
		//return true;
		if(self.fancyOnFancyBanned == false){
			return true;
		}
		let catACount = 0;
		let catBCount = 0;
		current_targeted_traits = self.total_targeted_traits;
		for(var trait in current_targeted_traits){
			trait = current_targeted_traits[trait];
			if(catA.chanceOfTrait[trait] > 0.30){
				catACount += 1;
			}
			if(catB.chanceOfTrait[trait] > 0.30){
				catBCount += 1;
			}
		}

		//return catACount >= self.dominantCount && catBCount >= self.dominantCount;
		return catACount < current_targeted_traits.length && catBCount < current_targeted_traits.length;

	}

	//Does a threshold check where it passes if: for every trait, at least one of the two cats has a value of it that is above the threshold
	function traitRequirementsMet(catA, catB, current_targeted_traits, threshold){
		for(var trait in current_targeted_traits){
			trait = current_targeted_traits[trait];
			if(catA.chanceOfTrait[trait] > 0.02 || catB.chanceOfTrait[trait] > 0.02){

			} else {
				return false;
			}
		}
		return true;
	}

	//Checks if a cat has a brisk cooldown or better
	function eitherCatIsBriskOrBetter(catA, catB){
		if(self.brisk){
			return ((parseInt(catA.cooldownIndex,10) <= 7) || (parseInt(catB.cooldownIndex,10) <= 7));

		} else {
			return true;
		}
		//return true;
	}

	//Takes two cats and compares their matrons and sires. Depends on the last gotten info from calling the
	//contracts "getKitten" function, so the cat objects need to be updated for this function to give real time results
	function isRelated(catA,catB){
		var isRelated = ((catA.matronId == catB.matronId) || (catA.sireId == catB.sireId));
		var isRelatedB = ((catA.matronId == catB.sireId) || (catB.matronId == catA.sireId) || (catA.sireId == catB.matronId) || (catB.sireId == catA.matronId));
		isRelated = isRelated || isRelatedB;
		if(catA.generation == 0 && catB.generation == 0){
			
			isRelated = false;
			if(catA.id == catB.id){
				isRelated = true;
			}
		}
		return isRelated;
	}

	//Valid breeding check, combined check for convenience
	function isValidMatch(catA, catB, usedCats, needsSwift){

		//Checks that the cats are not related
		if(!(isRelated(catA, catB))){

			//Checks that neither cat is in the usedCats list
			if(!(usedCats.includes(catB.id)) && !(usedCats.includes(catA.id))){
				//if(catNotPending(catA) && catNotPending(catB)){
					//Checks that at least one cat is swift or better
					if(needsSwift){
						if(eitherCatIsSwiftOrBetter(catA, catB)){
							return true;
						} else {
							//console.log("Was not either swift or better?");
						}
					} else {
						return true;
					}
				//}
				
				
			} else {
				//console.log("was used cat?");
			}
		} else {
			//console.log("was related?");
		}

		return false;

	}

	function iteratePending(pendingTxes){
		for(var i=0; i < pendingTxes.length; i++ ) {
   		let input = pd_tx["input"];
    }
	}
	function catNotPending(cat){
		return web3.eth.getPastLogs({
   	 	address: "0x68b42e44079D1d0A4a037e8c6eCd62c48967e69f",
   	 	toBlock: "pending"
	}).then(iteratePending);
    
    

    return true;
	}

	return self;

}

module.exports = Fancyfier;