var bs58 = require('bs58');
class KittenGenes {
	constructor(genes){
		this.genes = genes;

	}

}

function convertToBase58(fiveBinaryBitsString){
	return(bs58.encode(fiveBinaryBitsString));
}

function toBinaryString(n) {
        // revert on out of range input

        var output = [];

        for (var i = 0; i < 5; i++) {
            output[4 - i] = (n % 2 == 1) ? ("1") : ("0");
            n /= 2;
        }

        return output;
    }


var sampleNumber = "511233256255868092540028846824444252128936084013668958617105773928416751";

var sampleID = 553355;
var totalSampleBits = "";

var arrayOfFiveBitStrings = [];

for(var number in sampleNumber){
	//sampleBits = toBinaryString(sampleNumber.charAt(number));
	sampleBits = toBinaryString(sampleNumber.charAt(number));

	//console.log(sampleBits);
	arrayOfFiveBitStrings.push(sampleBits);	
}
console.log(arrayOfFiveBitStrings.join());

for(var fiveBytes in arrayOfFiveBitStrings){
	var kaiNotation = bs58.encode(fiveBytes);
	//console.log(kaiNotation);
}

//console.log(arrayOfFiveBitStrings);