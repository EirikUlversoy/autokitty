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
var sampleNumber = "626778644471294720163847069335675480640660629103859177928213713027245229";

var totalSampleBits = "";

var arrayOfFiveBitStrings = [];

for(var number in sampleNumber){
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