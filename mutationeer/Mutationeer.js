var GeneDecoder = require("genedecoder")();
function Mutationeer(contract, web3, upper_wallet_address, ck_contract, cats, trait_combos){
	let self = {};
	self.upper_wallet_address = upper_wallet_address;
	self.web3 = web3;
	self.ck_contract = ck_contract;
	self.kittens_by_generation = {};
	self.cats = cats;
	self.all_trait_combos = all_trait_combos;
	self.scored_cats = [];
	self.used_cats = [];

	self.separateByGeneration = function(exclude_not_ready){

		for (var kitten in self.cats){
			if(!self.kittens_by_generation[self.cats[kitten].generation]){
				self.kittens_by_generation[self.cats[kitten].generation] = [];
			}

			if(exclude_not_ready){
				if(self.cats[kitten].isReady){
					self.kittens_by_generation[self.cats[kitten].generation].push(self.cats[kitten]);
				}
			} else {
				self.kittens_by_generation[self.cats[kitten].generation].push(self.cats[kitten]);
			}
		}
	}

	self._scoreCatsBasedOnTraits = function(trait_combo){
		var catScores = {};
		//Dictionary pairing catIDs with scores.
		for(var cat in self.cats){
			var count = cat;
			cat = self.cats[cat];
			var score = 0;
			var missingTraits = [];
			for(var trait in trait_combo){
				var chance = cat.chanceOfTrait[trait_combo[trait]];
				if(chance > 0){
					if(trait_combo.includes(trait_combo[trait])){
						score += chance;
				} else {
					if(trait_combo.includes(trait_combo[trait])){
						missingTraits.push(trait_combo[trait]);
					} 
				}

			}
			cat_scores[cat.id] = new CatWithScore(cat.id, score, missingTraits);
			//console.log(cat.chanceOfTrait);
		}

		return cat_scores;
	}

	self.assign_trait_chances = function(traits){
		var scored_cats = [];

		for(var cat in self.cats){
			var scored_kitten = GeneDecoder.simpleFilter(cats[cat],traits);
			if(!isEmptyObject(newKitten.chanceOfTrait)){
				newCats.push(newKitten);
			}
		}
		console.log("Found " + newCats.length + " filtered cats!");
		//console.log(newCats);
		return scored_cats;
	}

	self.setup = function(){
		let exclude_not_ready = false;
		self.separateByGeneration(exclude_not_ready);

		//Score for all relevant traits:
		var merged_trait_combos = [].concat.apply([], self.trait_combos);
		self.scored_cats = self.assign_trait_chances(merged_trait_combos);

		
		self.scored_combos = {};
		for(var combo in self.trait_combos){
			combo = trait_combos[combo];
			self.scored_combos[combo] = self._scoreCatsBasedOnTraits(combo);

		}

	}

	


}