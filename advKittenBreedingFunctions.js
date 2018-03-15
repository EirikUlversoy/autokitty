
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


//Suitable cats should have one of the needed traits
function findSuitableCats(traits, kittens){
	var suitableCats = [];
	for(var cat in kittens){
		cat = kittens[cat];
		found = 0;
		for(trait in traits){
			if(_.contains(cat.cattributes, trait) && found == 0){
				suitableCats.push(cat);
			}
		}
	}
	return suitableCats;
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