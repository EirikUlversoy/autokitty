function RankingModule(){
	var self = {};
	var GeneDecoder = require("../genedecoder")();
	var Comparators = require("../ak-comparators");


	function CatWithScore(id, score, missingTraits){
		this.id = id;
		this.score = score;
		this.missingTraits = missingTraits;
	}

	self.scoreCatsBasedOnTraits = function(catsWithAnyTrait, extraPoints, targetedTraits){
		var catScores = {};
		//Dictionary pairing catIDs with scores.
		for(var cat in catsWithAnyTrait){
			var count = cat;
			cat = catsWithAnyTrait[cat];
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

	self.createTopLists = function(targetedTraits){
		var topLists = [];
		for(var trait in targetedTraits){
			trait = targetedTraits[trait];
			traitTopList = self.createSingleTopList(trait);
			topLists.push(traitTopList);
			//console.log(traitTopList);
		}

		return topLists;
	}

	self.createSingleTopList = function(trait, cats){
		var topList = [];
		for(var cat in cats){
			cat = cats[cat];
			if(cat.chanceOfTrait[trait]){
				topList.push(cat);
			}

		}
		Comparators = require('../ak-comparators');
		topList.sort(Comparators.traitScoreComparator(trait));
		return topList;
	}

	self.unorderedDictionaryToOrderedArrayByScore = function(catDictionary){
		var scoreKeys = Object.keys(catDictionary);
		var arrayOfScoredCats = [];
		for(var key in scoreKeys){
			key = scoreKeys[key];
			arrayOfScoredCats.push(new CatWithScore(key, catDictionary[key], ""));
			//arrayOfScoredCats.push(scores[key]);
		}

		arrayOfScoredCats.sort(Comparators.keyComparator("score"));

		return arrayOfScoredCats;

	}
	self.scoreCatsBasedOnSingleTrait = function(trait, cats){
		var catScores = {};
		for(var cat in cats){
			if(cats[cat]){
				var count = cat;
				cat = cats[cat];
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

		self.getSortedArrayOfScoredMutaCatsFromDictionary = function(scores){
		var arrayOfScoredCats = [];
		var scoreKeys = Object.keys(scores);

		for(var key in scoreKeys){
			key = scoreKeys[key];
			//arrayOfScoredCats.push(new CatWithScore(scores[score]))
			arrayOfScoredCats.push([key,scores[key]]);
		}
		arrayOfScoredCats.sort(function(a,b) {return (a[1] > b[1]) ? 1 : ((b[1] > a[1]) ? -1 : 0);} );
		arrayOfScoredCats.reverse();

		//arrayOfScoredCats.sort();
		return arrayOfScoredCats;
	}
	self.makeMutationScoreDictionarySingularHC = function(cat, copyOfCats, catDictionary){
		scoredDictionary = {};
		for(var cat_B in copyOfCats){
			cat_B = copyOfCats[cat_B];
			var totalMutaScore = 0.0;
			if(cat_B.generation == 0 || cat.generation == 0){
				totalMutaScore += GeneDecoder.rareMutationMatcher(cat, cat_B);
			} else {
				totalMutaScore += GeneDecoder.mutationMatcher(cat, cat_B);
			}
			scoredDictionary[cat_B.id] = totalMutaScore;
			//console.log("??")

		}

		return scoredDictionary;

	}
	self.makeMutationScoreDictionarySingular = function(cat, traitScoreList, catDictionary){
		scoredDictionary = {};
		for(var cat_B in traitScoreList){
			cat_B = catDictionary[traitScoreList[cat_B].id];

			var totalMutaScore = 0.0;
			totalMutaScore += GeneDecoder.mutationMatcher(cat, cat_B);
			scoredDictionary[cat_B.id] = totalMutaScore;
			//console.log("??")

		}

		return scoredDictionary;

	}
	self.makeMutationScoreDictionary = function(cats){
		copyOfCats = cats.slice();
		scoredDictionary = {};
		for(var catIndex in cats){
			cat = cats[catIndex];
			var avgMutaScore = 0.0;
			var totalMutaScore = 0.0;
			for(var copyOfCatIndex in copyOfCats){
				cat_2 = copyOfCats[copyOfCatIndex];
				totalMutaScore += GeneDecoder.mutationMatcher(cat, cat_2);
			}
			avgMutaScore = totalMutaScore/(copyOfCats.length-1);
			scoredDictionary[cat] = avgMutaScore;
		}

		return scoredDictionary;

	}
	self.makeSingleTraitScoreDictionary = function(targetedTraits, cats){
		console.log("Making single scored lists for all traits and putting them in a dict...");
		singleTraitScoreDictionary = {};
		for(let trait in targetedTraits){
			trait = targetedTraits[trait];
			let traitScoreList = self.scoreCatsBasedOnSingleTrait(trait, cats);
			singleTraitScoreDictionary[trait] = traitScoreList;
		}
		return singleTraitScoreDictionary;

	}

		self.getSortedArrayOfScoredCatsFromDictionary = function(scores){
		var arrayOfScoredCats = [];
		var scoreKeys = Object.keys(scores);

		for(var key in scoreKeys){
			key = scoreKeys[key];
			//arrayOfScoredCats.push(new CatWithScore(scores[score]))
			arrayOfScoredCats.push(scores[key]);
		}
		arrayOfScoredCats.sort(Comparators.keyComparator("score"));
		return arrayOfScoredCats;
	}

	
	

	return self;
}

module.exports = RankingModule;