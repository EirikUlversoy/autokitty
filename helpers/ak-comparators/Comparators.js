module.exports = {
		keyComparator(key){
		var sortOrder = -1;
		if(key[0] === "-"){
			sortOrder = -1;
			key = key.substr(1); 
		}

		return function(a,b){
			var result = (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0;
			return result * sortOrder;
		}
	},

	traitScoreComparator(trait){
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
};