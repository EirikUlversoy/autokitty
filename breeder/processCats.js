async function processCats(catPortion, copyOfCats, catDictionary, GeneDecoder) {
   let sendMails = 0;
   // logic for
   // sending multiple mails
   GeneDecoder = require('genedecoder')();

   	function BreedingPair(id1, id2, score){
		this.id1 = id1;
		this.id2 = id2;
		this.score = score;
	}

   _getSortedArrayOfScoredMutaCatsFromDictionary = function(scores){
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
	_makeMutationScoreDictionarySingularHC = function(cat, copyOfCats, catDictionary){
		scoredDictionary = {};
		for(var cat_B in copyOfCats){
			cat_B = copyOfCats[cat_B];
			var totalMutaScore = 0.0;
			totalMutaScore += GeneDecoder.mutationMatcher(cat, cat_B);
			scoredDictionary[cat_B.id] = totalMutaScore;
			//console.log("??")

		}

		return scoredDictionary;

	}
   _isRelated = function(catA,catB){
		var isRelated = ((catA.matronId == catB.matronId) || (catA.sireId == catB.sireId));
		var isRelatedB = ((catA.matronId == catB.sireId) || (catB.matronId == catA.sireId) || (catA.sireId == catB.matronId) || (catB.sireId == catA.matronId));
		isRelated = isRelated || isRelatedB;
		if(catA.generation == 0 && catB.generation == 0){
			isRelated = false;
		}
		return isRelated;
	}
   isValidMatch = function(catA, catB){
		if(!(_isRelated(catA, catB))){
			return true;
		} else {
			console.log("was related?");
		}

		return false;
	}

	_printFive = function(listToPrint){
		for(var item in listToPrint){
			if(item < 5){
				console.log(listToPrint[item]);
			}
		}
	}
   var internalBreedingPairs = [];
   for(var cat in catPortion){
	//cat = self.cats[cat];
		var partner = undefined;
		console.log("At cat number:" + cat);
		nCat = catPortion[cat];
		mutationUnordered = _makeMutationScoreDictionarySingularHC(catDictionary[nCat.id], copyOfCats, catDictionary);
		mutationOrdered = _getSortedArrayOfScoredMutaCatsFromDictionary(mutationUnordered);
		_printFive(mutationOrdered);
		if( mutationOrdered.length != 0){
			partner = catDictionary[mutationOrdered[0][0]];
			if((isValidMatch(nCat, partner)) && (mutationOrdered[0][1] >= 0) && (nCat.id != partner.id)){
				console.log("is valid?");
			} else {
				partner = undefined;
			}
		}
		if(partner != undefined){
			//Utilities.remove(catPortion, partner.id);
			//Utilities.remove(catPortion, nCat.id);
			//Utilities.remove(self.cats, nCat.id);
			//Utilities.remove(self.cats, partner.id);
			//self.usedCats.push(nCat.id);
			//self.usedCats.push(partner.id);
			//self._removeBreedingPairFromAllTraitLists(nCat, partner, self.targetedTraits);
			nCat = catDictionary[nCat.id];

			console.log("Found match in PURE MUTATION mode!");
			console.log("Match ids are: " + nCat.id + " and " + partner.id + "!");
			//console.log("Match had the score --> : " + scoredCat.score + " , " + scores[partner.id].score);
			/*
			var bpscore = [];
			bpscore.push(scoredCat.score);
			bpscore.push(scores[partner.id].score);
			self.breedingPairScores.push(bpscore);
			*/

			if(catDictionary[partner.id].cooldownIndex <= catDictionary[nCat.id].cooldownIndex){
			 	internalBreedingPairs.push(new BreedingPair(partner.id, nCat.id, mutationOrdered[0][1]));
			} else {
				internalBreedingPairs.push(new BreedingPair(nCat.id, partner.id, mutationOrdered[0][1]));
			}
		}
	}
   return internalBreedingPairs;
}

var internalBreedingPairs = [];
process.on('message', async (message) => {
  console.log('told to process cats:');
  internalBreedingPairs = processCats(message.catPortion, message.copyOfCats, message.catDictionary, message.GeneDecoder);
  process.send({ bp: internalBreedingPairs });
});