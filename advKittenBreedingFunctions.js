
//For one trait, should check which cats have it and add them to a traitlist.
//Parent function can check to see if the list is empty to fill its "filled_traits"
//list
function targetSingleTrait(trait, kittens, cb){
	for(var cat in kittens){
		for(var attribute in cat.enhanced_cattributes){
			if(attribute["type"] == trait.type){
				cb(cat);
			}
		}
	}
}

//Filtering cats to begin with to avoid breeding cats with low utility
function findSuitableCats(traits, kittens, cb){
	var found = 0
	var suitableCats = [];
	for(var cat in kittens){
		found = 0;
		for(trait in traits){
			if(_.contains(cat.cattributes, trait) && found == 0){
				suitableCats.push(cat);
				found = 1;
			}
		}
	}
	cb(suitableCats);
}

//Main targeting function. Should add all cats that fits any trait to a list,
//and add the filled trait to a separate list
function targeting(traits, kittens, cb){
	var filled_traits = []
	
	targetingCallback(trait){
		if(trait){
			filled_traits.push(trait);
		};
	}
	for (trait in traits){
		targetSingleTrait(trait, kittens, targetingCallback);

	}
}

//Should be used to increase generation bounds between suitable cats when enabled
//Should be disabled by default.
function generationCompromise(traits, leftoverKittens){

}

//More advanced version of normal targeting functions
function fancyGenerator(){

}

//More advanced gene functions (low priority)
function genefilter(){

}