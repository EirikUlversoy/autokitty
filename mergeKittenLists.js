let fs = require('fs');
function readKittensFromDisk(filename, numberFrom, numberTo){
	let text = fs.readFileSync('C:/users/eulve/autokitty/kittens/' + filename + numberFrom + '.txt', 'utf8');
	let splitText = text.split(",");

	for(let filenumber = numberFrom+1; filenumber <= numberTo; filenumber++){
		let secondText = fs.readFileSync('C:/users/eulve/autokitty/kittens/' + filename +filenumber+'.txt','utf8');
		let secondSplitText = secondText.split(",");
		for(let kittenID in secondSplitText){
			kittenID = secondSplitText[kittenID];
			if(!splitText.includes(kittenID)){
				splitText.push(kittenID);
			}
		}
	}

	return splitText;
}

function saveKittenIds(kittens){
	output = [];
	for (var kitten in kittens){
		output.push(kittens[kitten]);
	}
	fs.writeFile('gen0Merged.txt', output, (err) => {
  	if (err) throw err;
  	console.log('It\'s saved!');
});}

saveKittenIds(readKittensFromDisk("gen0",1,8));



