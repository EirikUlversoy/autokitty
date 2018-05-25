var net = require('net');
var Web3 = require("web3");
var bs58 = require('bs58');
var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net));
var Promise = require("bluebird");
var hexToBinary = require('hex-to-binary');


function GeneDecoder(){
	let self = {};
	function setup(){
		geneGroupNames[0] = "Unknown";
		geneGroupNames[1] = "Unknown";
		geneGroupNames[2] = "Unknown";
		geneGroupNames[3] = "Mouth";
		geneGroupNames[4] = "Wild";
		geneGroupNames[5] = "Color";
		geneGroupNames[6] = "Pattern Color";
		geneGroupNames[7] = "Body Color";
		geneGroupNames[8] = "Eye Type";
		geneGroupNames[9] = "Eye Color";
		geneGroupNames[10] = "Pattern";
		geneGroupNames[11] = "Body";



		bodyGeneNames["Savannah"] = "1";
		bodyGeneNames["Selkirk"] = "2";
		bodyGeneNames["Non-rel_body_3"] = "3";
		bodyGeneNames["Birman"] = "4";
		bodyGeneNames["Koladiviya"] = "5";
		bodyGeneNames["Bobtail"] = "6";
		bodyGeneNames["Non-rel_body_7"] = "7";
		bodyGeneNames["Pixiebob"] = "8";
		bodyGeneNames["Non-rel_body_9"] = "9";
		bodyGeneNames["Cymric"] = "a";
		bodyGeneNames["Chartreux"] = "b";
		bodyGeneNames["Himalayan"] = "c";
		bodyGeneNames["Munchkin"] = "d";
		bodyGeneNames["Sphynx"] = "e";
		bodyGeneNames["Ragamuffin"] = "f";
		bodyGeneNames["Ragdoll"] = "g";
		bodyGeneNames["Norwegianforest"] = "h";
		bodyGeneNames["Non-rel_body_i"] = "i";
		bodyGeneNames["Highlander"] = "j";
		bodyGeneNames["Non-rel_body_k"] = "k";
		bodyGeneNames["Non-rel_body_m"] = "m";
		bodyGeneNames["Mainecoon"] = "n";
		bodyGeneNames["Laperm"] = "o";
		bodyGeneNames["Persian"] = "p";
		bodyGeneNames["Non-rel_body_q"] = "q";
		bodyGeneNames["Non-rel_body_r"] = "r";
		bodyGeneNames["Non-rel_body_s"] = "s";
		bodyGeneNames["Manx"] = "t";
		bodyGeneNames["Non-rel_body_u"] = "u";
		bodyGeneNames["Non-rel_body_v"] = "v";
		bodyGeneNames["Non-rel_body_w"] = "w";

		patternGeneNames["Non-rel_pattern_1"] = "1";
		patternGeneNames["Tiger"] = "2";
		patternGeneNames["Rascal"] = "3";
		patternGeneNames["Ganado"] = "4";
		patternGeneNames["Leopard"] = "5";
		patternGeneNames["Camo"] = "6";
		patternGeneNames["Non-rel_pattern_7"] = "7";
		patternGeneNames["Spangled"] = "8";
		patternGeneNames["Calicool"] = "9";
		patternGeneNames["Luckystripe"] = "a";
		patternGeneNames["Amur"] = "b";
		patternGeneNames["Jaguar"] = "c";
		patternGeneNames["Spock"] = "d";
		patternGeneNames["Non-rel_pattern_e"] = "e";
		patternGeneNames["Totesbasic_f"] = "f";
		patternGeneNames["Totesbasic_g"] = "g";
		patternGeneNames["Non-rel_pattern_h"] = "h";
		patternGeneNames["Thunderstruck"] = "i";
		patternGeneNames["Dippedcone"] = "j";
		patternGeneNames["Non-rel_pattern_k"] = "k";		
		patternGeneNames["Tigerpunk"] = "m";
		patternGeneNames["Henna"] = "n";
		patternGeneNames["Non-rel_pattern_o"] = "o";
		patternGeneNames["Totesbasic_p"] = "p";
		patternGeneNames["Non-rel_pattern_q"] = "q";
		patternGeneNames["Non-rel_pattern_r"] = "r";
		patternGeneNames["Hotrod"] = "s";
		patternGeneNames["Non-rel_pattern_t"] = "t";
		patternGeneNames["Non-rel_pattern_u"] = "u";
		patternGeneNames["Non-rel_pattern_v"] = "v";
		patternGeneNames["Non-rel_pattern_w"] = "w";


		colorEyesGeneNames["Thundergrey"] = "1";
		colorEyesGeneNames["Gold"] = "2";
		colorEyesGeneNames["Topaz"] = "3";
		colorEyesGeneNames["Non-rel_eyecolor_5"] = "5";
		colorEyesGeneNames["Mintgreen"] = "4";
		colorEyesGeneNames["Sizzurp"] = "6";
		colorEyesGeneNames["Chestnut"] = "7";
		colorEyesGeneNames["Strawberry"] = "8";
		colorEyesGeneNames["Sapphire"] = "9";
		colorEyesGeneNames["Forgetmenot"] = "a";
		colorEyesGeneNames["Non-rel_eyecolor_b"] = "b";
		colorEyesGeneNames["Coralsunrise"] = "c";
		colorEyesGeneNames["Non-rel_eyecolor_d"] = "d";
		colorEyesGeneNames["Doridnudibranch"] = "e";
		colorEyesGeneNames["Parakeet"] = "f";
		colorEyesGeneNames["Cyan"] = "g";
		colorEyesGeneNames["Pumpkin"] = "h";
		colorEyesGeneNames["Limegreen"] = "i";
		colorEyesGeneNames["Non-rel_eyecolor_j"] = "j";
		colorEyesGeneNames["Bubblegum"] = "k";
		colorEyesGeneNames["Twilightsparkle"] = "m";
		colorEyesGeneNames["Non-rel_eyecolor_n"] = "n";
		colorEyesGeneNames["Non-rel_eyecolor_o"] = "o";
		colorEyesGeneNames["Eclipse"] = "p";
		colorEyesGeneNames["Babypuke"] = "q";
		colorEyesGeneNames["Non-rel_eyecolor_r"] = "r";
		colorEyesGeneNames["Non-rel_eyecolor_s"] = "s";
		colorEyesGeneNames["Non-rel_eyecolor_t"] = "t";
		colorEyesGeneNames["Non-rel_eyecolor_u"] = "u";
		colorEyesGeneNames["Non-rel_eyecolor_v"] = "v";
		colorEyesGeneNames["Non-rel_eyecolor_w"] = "w";

		eyesGeneNames["Swarley"] = "1";
		eyesGeneNames["Wonky"] = "2";
		eyesGeneNames["Serpent"] = "3";
		eyesGeneNames["Googly"] = "4";
		eyesGeneNames["Otaku"] = "5";
		eyesGeneNames["Simple"] = "6";
		eyesGeneNames["Crazy"] = "7";
		eyesGeneNames["Thicccbrowz"] = "8";
		eyesGeneNames["Caffeine"] = "9";
		eyesGeneNames["Non-rel_eyeshape_a"] = "a";
		eyesGeneNames["Baddate"] = "b";
		eyesGeneNames["Non-rel_eyeshape_c"] = "c";
		eyesGeneNames["Chronic"] = "d";
		eyesGeneNames["Slyboots"] = "e";
		eyesGeneNames["Wiley"] = "f";
		eyesGeneNames["Stunned"] = "g";
		eyesGeneNames["Chameleon"] = "h";
		eyesGeneNames["Alien"] = "i";
		eyesGeneNames["Fabulous"] = "j";
		eyesGeneNames["Raisedbrow"] = "k";
		eyesGeneNames["Non-rel_eyeshape_m"] = "m";
		eyesGeneNames["Non-rel_eyeshape_n"] = "n";
		eyesGeneNames["Sass"] = "o";
		eyesGeneNames["Sweetmeloncakes"] = "p";
		eyesGeneNames["Oceanid"] = "q";
		eyesGeneNames["Wingtips"] = "r";
		eyesGeneNames["Non-rel_eyeshape_s"] = "s";
		eyesGeneNames["Buzzed"] = "t";
		eyesGeneNames["Bornwithit"] = "u";
		eyesGeneNames["Non-rel_eyeshape_v"] = "v";
		eyesGeneNames["Non-rel_eyeshape_w"] = "w";



		colorPrimaryGeneNames["Shadowgrey"] = "1";
		colorPrimaryGeneNames["Salmon"] = "2";
		colorPrimaryGeneNames["Non-rel_primarycolor_3"] = "3";
		colorPrimaryGeneNames["Orangesoda"] = "4";
		colorPrimaryGeneNames["Cottoncandy"] = "5";
		colorPrimaryGeneNames["Mauveover"] = "6";
		colorPrimaryGeneNames["Aquamarine"] = "7";
		colorPrimaryGeneNames["Nachocheez"] = "8";
		colorPrimaryGeneNames["Harbourfog"] = "9";
		colorPrimaryGeneNames["Cinderella"] = "a";
		colorPrimaryGeneNames["Greymatter"] = "b";
		colorPrimaryGeneNames["Non-rel_primarycolor_c"] = "c";
		colorPrimaryGeneNames["Non-rel_primarycolor_d"] = "d";
		colorPrimaryGeneNames["Dragonfruit"] = "e";
		colorPrimaryGeneNames["Hintomint"] = "f";
		colorPrimaryGeneNames["Bananacream"] = "g";
		colorPrimaryGeneNames["Cloudwhite"] = "h";
		colorPrimaryGeneNames["Non-rel_primarycolor_i"] = "i";
		colorPrimaryGeneNames["Oldlace"] = "j";
		colorPrimaryGeneNames["Koala"] = "k";
		colorPrimaryGeneNames["Lavender"] = "m";
		colorPrimaryGeneNames["Non-rel_primarycolor_n"] = "n";
		colorPrimaryGeneNames["Non-rel_primarycolor_o"] = "o";
		colorPrimaryGeneNames["Verdigris"] = "p";
		colorPrimaryGeneNames["Non-rel_primarycolor_q"] = "q";
		colorPrimaryGeneNames["Onyx"] = "r";
		colorPrimaryGeneNames["Non-rel_primarycolor_s"] = "s";
		colorPrimaryGeneNames["Non-rel_primarycolor_t"] = "t";
		colorPrimaryGeneNames["Non-rel_primarycolor_u"] = "u";
		colorPrimaryGeneNames["Non-rel_primarycolor_v"] = "v";
		colorPrimaryGeneNames["Non-rel_primarycolor_w"] = "w";


		colorSecondaryGeneNames["Non-rel_secondarycolor_1"] = "1";
		colorSecondaryGeneNames["Springcrocus"] = "2";
		colorSecondaryGeneNames["Egyptiankohl"] = "3";
		colorSecondaryGeneNames["Poisonberry"] = "4";
		colorSecondaryGeneNames["Lilac"] = "5";
		colorSecondaryGeneNames["Apricot"] = "6";
		colorSecondaryGeneNames["Royalpurple"] = "7";
		colorSecondaryGeneNames["Non-rel_secondarycolor_8"] = "8";
		colorSecondaryGeneNames["Swampgreen"] = "9";
		colorSecondaryGeneNames["Violet"] = "a";
		colorSecondaryGeneNames["Scarlet"] = "b";
		colorSecondaryGeneNames["Barkbrown"] = "c";
		colorSecondaryGeneNames["Coffee"] = "d";
		colorSecondaryGeneNames["Lemonade"] = "e";
		colorSecondaryGeneNames["Chocolate"] = "f";
		colorSecondaryGeneNames["Butterscotch"] = "g";
		colorSecondaryGeneNames["Non-rel_secondarycolor_h"] = "h";
		colorSecondaryGeneNames["Safetyvest"] = "i";
		colorSecondaryGeneNames["Turtleback"] = "j";
		colorSecondaryGeneNames["Non-rel_secondarycolor_k"] = "k";
		colorSecondaryGeneNames["Wolfgrey"] = "m";
		colorSecondaryGeneNames["Cerulian"] = "n";
		colorSecondaryGeneNames["Skyblue"] = "o";
		colorSecondaryGeneNames["Garnet"] = "p";
		colorSecondaryGeneNames["Non-rel_secondarycolor_q"] = "q";
		colorSecondaryGeneNames["Non-rel_secondarycolor_r"] = "r";
		colorSecondaryGeneNames["Royalblue"] = "s";
		colorSecondaryGeneNames["Mertail"] = "t";
		colorSecondaryGeneNames["Non-rel_secondarycolor_u"] = "u";
		colorSecondaryGeneNames["Pearl"] = "v";
		colorSecondaryGeneNames["Non-rel_secondarycolor_w"] = "w";


		colorTertiaryGeneNames["Belleblue"] = "1";
		colorTertiaryGeneNames["Sandalwood"] = "2";
		colorTertiaryGeneNames["Peach"] = "3";
		colorTertiaryGeneNames["Icy"] = "4";
		colorTertiaryGeneNames["Granitegrey"] = "5";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_6"] = "6";
		colorTertiaryGeneNames["Kittencream"] = "7";
		colorTertiaryGeneNames["Emeraldgreen"] = "8";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_9"] = "9";
		colorTertiaryGeneNames["Shale"] = "a";
		colorTertiaryGeneNames["Purplehaze"] = "b";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_c"] = "c";
		colorTertiaryGeneNames["Azaleablush"] = "d";
		colorTertiaryGeneNames["Missmuffett"] = "e";
		colorTertiaryGeneNames["Morningglory"] = "f";
		colorTertiaryGeneNames["Frosting"] = "g";
		colorTertiaryGeneNames["Daffodil"] = "h";
		colorTertiaryGeneNames["Flamingo"] = "i";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_j"] = "j";
		colorTertiaryGeneNames["Bloodred"] = "k";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_m"] = "m";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_n"] = "n";
		colorTertiaryGeneNames["Periwinkle"] = "o";
		colorTertiaryGeneNames["Patrickstarfish"] = "p";
		colorTertiaryGeneNames["Seafoam"] = "q";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_r"] = "r";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_s"] = "s";
		colorTertiaryGeneNames["Mintmacaron"] = "t";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_u"] = "u";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_v"] = "v";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_w"] = "w";

		wildGeneNames["Dracula"] = "1";
		wildGeneNames["Non-rel_wild_2"] = "2";
		wildGeneNames["Wild_3"] = "3";
		wildGeneNames["Wild_4"] = "4";
		wildGeneNames["Non-rel_wild_5"] = "5";
		wildGeneNames["Wild_6"] = "6";
		wildGeneNames["Wild_7"] = "7";
		wildGeneNames["Wild_8"] = "8";
		wildGeneNames["Wild_9"] = "9";
		wildGeneNames["Wild_a"] = "a";
		wildGeneNames["Non-rel_wild_b"] = "b";
		wildGeneNames["Non-rel_wild_c"] = "c";
		wildGeneNames["Santa"] = "d";
		wildGeneNames["Non-rel_wild_e"] = "e";
		wildGeneNames["Wild_f"] = "f";
		wildGeneNames["Wild_g"] = "g";
		wildGeneNames["Non-rel_wild_h"] = "h";
		wildGeneNames["Elk"] = "i";
		wildGeneNames["Non-rel_wild_j"] = "j";
		wildGeneNames["Trioculus"] = "k";
		wildGeneNames["Daemonwings"] = "m";
		wildGeneNames["Non-rel_wild_n"] = "n";
		wildGeneNames["Non-rel_wild_o"] = "o";
		wildGeneNames["Daemonhorns"] = "p";
		wildGeneNames["Non-rel_wild_q"] = "q";
		wildGeneNames["Non-rel_wild_r"] = "r";
		wildGeneNames["Non-rel_wild_s"] = "s";
		wildGeneNames["Non-rel_wild_t"] = "t";
		wildGeneNames["Non-rel_wild_u"] = "u";
		wildGeneNames["Non-rel_wild_v"] = "v";
		wildGeneNames["Non-rel_wild_w"] = "w";

		mouthGeneNames["Whixtensions"] = "1";
		mouthGeneNames["Wasntme"] = "2";
		mouthGeneNames["Wuvme"] = "3";
		mouthGeneNames["Gerbil"] = "4";
		mouthGeneNames["Non-rel_mouth_5"] = "5";
		mouthGeneNames["Non-rel_mouth_6"] = "6";
		mouthGeneNames["Belch"] = "7";
		mouthGeneNames["Rollercoaster"] = "8";
		mouthGeneNames["Beard"] = "9";
		mouthGeneNames["Pouty"] = "a";
		mouthGeneNames["Saycheese"] = "b";
		mouthGeneNames["Grim"] = "c";
		mouthGeneNames["Non-rel_mouth_d"] = "d";
		mouthGeneNames["Non-rel_mouth_e"] = "e";
		mouthGeneNames["Happygokitty"] = "f";
		mouthGeneNames["Soserious"] = "g";
		mouthGeneNames["Cheeky"] = "h";
		mouthGeneNames["Starstruck"] = "i";
		mouthGeneNames["Non-rel_mouth_j"] = "j";
		mouthGeneNames["Ruroh"] = "k";
		mouthGeneNames["Dali"] = "m";
		mouthGeneNames["Grimace"] = "n";
		mouthGeneNames["Non-rel_mouth_o"] = "o";
		mouthGeneNames["Tongue"] = "p";
		mouthGeneNames["Yokel"] = "q";
		mouthGeneNames["Non-rel_mouth_r"] = "r";
		mouthGeneNames["Neckbeard"] = "s";
		mouthGeneNames["Non-rel_mouth_t"] = "t";
		mouthGeneNames["Non-rel_mouth_u"] = "u";
		mouthGeneNames["Non-rel_mouth_v"] = "v";
		mouthGeneNames["Non-rel_mouth_w"] = "w";

		environmentGeneNames["Mystery_1"] = "1";
		environmentGeneNames["Mystery_2"] = "2";
		environmentGeneNames["Non-rel_environment_3"] = "3";
		environmentGeneNames["Mystery_4"] = "4";
		environmentGeneNames["Non-rel_environment_5"] = "5";
		environmentGeneNames["Mystery_6"] = "6";
		environmentGeneNames["Mystery_7"] = "7";
		environmentGeneNames["Mystery_8"] = "8";
		environmentGeneNames["Non-rel_environment_9"] = "9";
		environmentGeneNames["Mystery_a"] = "a";
		environmentGeneNames["Non-rel_environment_b"] = "b";
		environmentGeneNames["Non-rel_environment_c"] = "c";
		environmentGeneNames["Non-rel_environment_d"] = "d";
		environmentGeneNames["Non-rel_environment_e"] = "e";
		environmentGeneNames["Mystery_f"] = "f";
		environmentGeneNames["Non-rel_environment_g"] = "g";
		environmentGeneNames["Salty"] = "h";
		environmentGeneNames["Non-rel_environment_i"] = "i";
		environmentGeneNames["Non-rel_environment_j"] = "j";
		environmentGeneNames["Tinybox"] = "k";
		environmentGeneNames["Non-rel_environment_m"] = "m";
		environmentGeneNames["Non-rel_environment_n"] = "n";
		environmentGeneNames["Non-rel_environment_o"] = "o";
		environmentGeneNames["Non-rel_environment_p"] = "p";
		environmentGeneNames["Non-rel_environment_q"] = "q";
		environmentGeneNames["Non-rel_environment_r"] = "r";
		environmentGeneNames["Non-rel_environment_s"] = "s";
		environmentGeneNames["Non-rel_environment_t"] = "t";
		environmentGeneNames["Non-rel_environment_u"] = "u";
		environmentGeneNames["Non-rel_environment_v"] = "v";
		environmentGeneNames["Non-rel_environment_w"] = "w";

		secretGeneNames["Secret_1"] = "1";
		secretGeneNames["Secret_2"] = "2";
		secretGeneNames["Non-rel_secret_3"] = "3";
		secretGeneNames["Non-rel_secret_4"] = "4";
		secretGeneNames["Secret_5"] = "5";
		secretGeneNames["Secret_6"] = "6";
		secretGeneNames["Secret_7"] = "7";
		secretGeneNames["Secret_8"] = "8";
		secretGeneNames["Non-rel_secret_9"] = "9";
		secretGeneNames["Secret_a"] = "a";
		secretGeneNames["Non-rel_secret_b"] = "b";
		secretGeneNames["Non-rel_secret_c"] = "c";
		secretGeneNames["Non-rel_secret_d"] = "d";
		secretGeneNames["Secret_e"] = "e";
		secretGeneNames["Secret_f"] = "f";
		secretGeneNames["Non-rel_secret_g"] = "g";
		secretGeneNames["Non-rel_secret_h"] = "h";
		secretGeneNames["Non-rel_secret_i"] = "i";
		secretGeneNames["Secret_j"] = "j";
		secretGeneNames["Secret_k"] = "k";
		secretGeneNames["Non-rel_secret_m"] = "m";
		secretGeneNames["Non-rel_secret_n"] = "n";
		secretGeneNames["Non-rel_secret_o"] = "o";
		secretGeneNames["Non-rel_secret_p"] = "p";
		secretGeneNames["Non-rel_secret_q"] = "q";
		secretGeneNames["Secret_r"] = "r";
		secretGeneNames["Non-rel_secret_s"] = "s";
		secretGeneNames["Non-rel_secret_t"] = "t";
		secretGeneNames["Non-rel_secret_u"] = "u";
		secretGeneNames["Non-rel_secret_v"] = "v";
		secretGeneNames["Non-rel_secret_w"] = "w";

		unknownGeneNames["Non-rel_unknown_1"] = "1";
		unknownGeneNames["Non-rel_unknown_2"] = "2";
		unknownGeneNames["Non-rel_unknown_3"] = "3";
		unknownGeneNames["Non-rel_unknown_4"] = "4";
		unknownGeneNames["Non-rel_unknown_5"] = "5";
		unknownGeneNames["Non-rel_unknown_6"] = "6";
		unknownGeneNames["Unknown_7"] = "7";
		unknownGeneNames["Non-rel_unknown_8"] = "8";
		unknownGeneNames["Unknown_9"] = "9";
		unknownGeneNames["Unknown_a"] = "a";
		unknownGeneNames["Non-rel_unknown_b"] = "b";
		unknownGeneNames["Unknown_c"] = "c";
		unknownGeneNames["Unknown_d"] = "d";
		unknownGeneNames["Non-rel_unknown_e"] = "e";
		unknownGeneNames["Non-rel_unknown_f"] = "f";
		unknownGeneNames["Unknown_g"] = "g";
		unknownGeneNames["Non-rel_unknown_h"] = "h";
		unknownGeneNames["Non-rel_unknown_i"] = "i";
		unknownGeneNames["Non-rel_unknown_j"] = "j";
		unknownGeneNames["Non-rel_unknown_k"] = "k";
		unknownGeneNames["Unknown_m"] = "m";
		unknownGeneNames["Non-rel_unknown_n"] = "n";
		unknownGeneNames["Non-rel_unknown_o"] = "o";
		unknownGeneNames["Non-rel_unknown_p"] = "p";
		unknownGeneNames["Non-rel_unknown_q"] = "q";
		unknownGeneNames["Non-rel_unknown_r"] = "r";
		unknownGeneNames["Non-rel_unknown_s"] = "s";
		unknownGeneNames["Non-rel_unknown_t"] = "t";
		unknownGeneNames["Non-rel_unknown_u"] = "u";
		unknownGeneNames["Non-rel_unknown_v"] = "v";
		unknownGeneNames["Non-rel_unknown_w"] = "w";


		geneNames[0] = "3rd Recessive";
		geneNames[1] = "2nd Recessive";
		geneNames[2] = "1st Recessive";
		geneNames[3] = "Dominant";
	}
	var geneGroupNames = {};
	var bodyGeneNames = {};
	var patternGeneNames = {};
	var colorEyesGeneNames = {};
	var eyesGeneNames = {};
	var colorPrimaryGeneNames = {};
	var colorSecondaryGeneNames = {};
	var colorTertiaryGeneNames = {};
	var wildGeneNames = {};
	var mouthGeneNames = {};
	var environmentGeneNames = {};
	var secretGeneNames = {};
	var unknownGeneNames = {};
	var geneNames = {};


	var genePercentages = {};

	genePercentages[0] = 0.0078;
	genePercentages[1] = 0.0313;
	genePercentages[2] = 0.1250;
	genePercentages[3] = 0.3359;
	setup();
	var cryptokitties_contract_address = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
	//var kitty_abi = [{"constant":true,"inputs":[{"name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cfoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_preferredTransport","type":"string"}],"name":"tokenMetadata","outputs":[{"name":"infoUrl","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"promoCreatedCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ceoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_STARTING_PRICE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setSiringAuctionAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pregnantKitties","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_kittyId","type":"uint256"}],"name":"isPregnant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_AUCTION_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"siringAuction","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setGeneScienceAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCEO","type":"address"}],"name":"setCEO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCOO","type":"address"}],"name":"setCOO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_kittyId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_endingPrice","type":"uint256"},{"name":"_duration","type":"uint256"}],"name":"createSaleAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"sireAllowedToAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_matronId","type":"uint256"},{"name":"_sireId","type":"uint256"}],"name":"canBreedWith","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"kittyIndexToApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_kittyId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_endingPrice","type":"uint256"},{"name":"_duration","type":"uint256"}],"name":"createSiringAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"val","type":"uint256"}],"name":"setAutoBirthFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_sireId","type":"uint256"}],"name":"approveSiring","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCFO","type":"address"}],"name":"setCFO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_genes","type":"uint256"},{"name":"_owner","type":"address"}],"name":"createPromoKitty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"secs","type":"uint256"}],"name":"setSecondsPerBlock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_CREATION_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setSaleAuctionAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_v2Address","type":"address"}],"name":"setNewAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"secondsPerBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"name":"ownerTokens","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_matronId","type":"uint256"}],"name":"giveBirth","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAuctionBalances","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"cooldowns","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"kittyIndexToOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cooAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"autoBirthFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"erc721Metadata","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_genes","type":"uint256"}],"name":"createGen0Auction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_kittyId","type":"uint256"}],"name":"isReadyToBreed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PROMO_CREATION_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contractAddress","type":"address"}],"name":"setMetadataAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"saleAuction","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getKitty","outputs":[{"name":"isGestating","type":"bool"},{"name":"isReady","type":"bool"},{"name":"cooldownIndex","type":"uint256"},{"name":"nextActionAt","type":"uint256"},{"name":"siringWithId","type":"uint256"},{"name":"birthTime","type":"uint256"},{"name":"matronId","type":"uint256"},{"name":"sireId","type":"uint256"},{"name":"generation","type":"uint256"},{"name":"genes","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_sireId","type":"uint256"},{"name":"_matronId","type":"uint256"}],"name":"bidOnSiringAuction","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"gen0CreatedCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"geneScience","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_matronId","type":"uint256"},{"name":"_sireId","type":"uint256"}],"name":"breedWithAuto","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"matronId","type":"uint256"},{"indexed":false,"name":"sireId","type":"uint256"},{"indexed":false,"name":"cooldownEndBlock","type":"uint256"}],"name":"Pregnant","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"approved","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"kittyId","type":"uint256"},{"indexed":false,"name":"matronId","type":"uint256"},{"indexed":false,"name":"sireId","type":"uint256"},{"indexed":false,"name":"genes","type":"uint256"}],"name":"Birth","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newContract","type":"address"}],"name":"ContractUpgrade","type":"event"}];
	var kitty_abi = 
	[{"constant":true,"inputs":[{"name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cfoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_preferredTransport","type":"string"}],"name":"tokenMetadata","outputs":[{"name":"infoUrl","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"promoCreatedCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ceoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_STARTING_PRICE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setSiringAuctionAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pregnantKitties","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_kittyId","type":"uint256"}],"name":"isPregnant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_AUCTION_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"siringAuction","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setGeneScienceAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCEO","type":"address"}],"name":"setCEO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCOO","type":"address"}],"name":"setCOO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_kittyId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_endingPrice","type":"uint256"},{"name":"_duration","type":"uint256"}],"name":"createSaleAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"sireAllowedToAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_matronId","type":"uint256"},{"name":"_sireId","type":"uint256"}],"name":"canBreedWith","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"kittyIndexToApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_kittyId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_endingPrice","type":"uint256"},{"name":"_duration","type":"uint256"}],"name":"createSiringAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"val","type":"uint256"}],"name":"setAutoBirthFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_sireId","type":"uint256"}],"name":"approveSiring","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCFO","type":"address"}],"name":"setCFO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_genes","type":"uint256"},{"name":"_owner","type":"address"}],"name":"createPromoKitty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"secs","type":"uint256"}],"name":"setSecondsPerBlock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_CREATION_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setSaleAuctionAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_v2Address","type":"address"}],"name":"setNewAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"secondsPerBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"name":"ownerTokens","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_matronId","type":"uint256"}],"name":"giveBirth","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAuctionBalances","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"cooldowns","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"kittyIndexToOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cooAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"autoBirthFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"erc721Metadata","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_genes","type":"uint256"}],"name":"createGen0Auction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_kittyId","type":"uint256"}],"name":"isReadyToBreed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PROMO_CREATION_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contractAddress","type":"address"}],"name":"setMetadataAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"saleAuction","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getKitty","outputs":[{"name":"isGestating","type":"bool"},{"name":"isReady","type":"bool"},{"name":"cooldownIndex","type":"uint256"},{"name":"nextActionAt","type":"uint256"},{"name":"siringWithId","type":"uint256"},{"name":"birthTime","type":"uint256"},{"name":"matronId","type":"uint256"},{"name":"sireId","type":"uint256"},{"name":"generation","type":"uint256"},{"name":"genes","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_sireId","type":"uint256"},{"name":"_matronId","type":"uint256"}],"name":"bidOnSiringAuction","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"gen0CreatedCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"geneScience","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_matronId","type":"uint256"},{"name":"_sireId","type":"uint256"}],"name":"breedWithAuto","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"matronId","type":"uint256"},{"indexed":false,"name":"sireId","type":"uint256"},{"indexed":false,"name":"cooldownEndBlock","type":"uint256"}],"name":"Pregnant","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"approved","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"kittyId","type":"uint256"},{"indexed":false,"name":"matronId","type":"uint256"},{"indexed":false,"name":"sireId","type":"uint256"},{"indexed":false,"name":"genes","type":"uint256"}],"name":"Birth","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newContract","type":"address"}],"name":"ContractUpgrade","type":"event"}]

	//ownerWalletAddress = "0x380a1b2ae01dc2cb1d415c3d7f6bdb8a2a550cb6";
	//web3.eth.defaultAccount = ownerWalletAddress;
	//Linking to the contract itself
	var ck_contract = new web3.eth.Contract(kitty_abi,cryptokitties_contract_address);

	var invert = function (obj) {

	  var new_obj = {};

	  for (var prop in obj) {
	    if(obj.hasOwnProperty(prop)) {
	      new_obj[obj[prop]] = prop;
	    }
	  }

	  return new_obj;
	};

	function fiveBitToInteger(fiveBits){
	
		var numbers = [16,8,4,2,1];

		var counter = 0;
		var integerForm = 0;
		for (var bit in fiveBits){
			if(fiveBits[bit] == "1"){
				integerForm += numbers[counter];
			}
			counter++;
		}

		return integerForm;
	}

	self.translateGenesToKai = function (genes){
		var hexGenes = web3.utils.toHex(genes).replace("0x","");
		var binaryString = hexToBinary(hexGenes);

		var numberSequence = [];
		for (var x = 0; x<binaryString.length/5; x++){
			var nextInteger = fiveBitToInteger(binaryString.substring(x*5,(x+1)*5));
			numberSequence.push(nextInteger);
		}

		var bs58Alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
		var KAISequence = []

		for(var number in numberSequence){
			_number = numberSequence[number];
			KAISequence.push(bs58Alphabet[_number]);
		}
		KAISequence = KAISequence.join("");
		//console.log("Translated:\n " + hexGenes + " to the KAI sequence:\n " + KAISequence);
		return KAISequence;

	}
	self.checkGroupAttribute = function(group, groupDictionary){
		groupDictionary = invert(groupDictionary);
		var keys = Object.keys(groupDictionary);
		for(var gene in group){
			if(gene.contains("Un-rel")){
				console.log("Unreleased gene released! Or out of date trait database...");
				return true;
			}
		}
		return false;
	}
	self.outputGroupAttribute = function(group, groupDictionary){
		var recessiveA = "unknown";
		var recessiveB = "unknown";
		var recessiveC = "unknown";
		var dominant = "unknown";

		var geneArray = [];
		groupDictionary = invert(groupDictionary);
		if(groupDictionary[group[0]]){
			recessiveA = groupDictionary[group[0]]
		}

		if (groupDictionary[group[1]]) {
			recessiveB = groupDictionary[group[1]]
		}

		if (groupDictionary[group[2]]) {
			recessiveC = groupDictionary[group[2]]
		}

		if (groupDictionary[group[3]]) {
			dominant = groupDictionary[group[3]]
		}
		geneArray.push(recessiveA);
		geneArray.push(recessiveB);
		geneArray.push(recessiveC);
		geneArray.push(dominant);
		//console.log("Recessive genes: " + "\n" + recessiveA + "\n" + recessiveB + "\n" + recessiveC + "\nDominant genes: " + dominant + "\n");
		return geneArray;

	}

	self._isPureBred = function(geneArray){
		if(geneArray[0] == geneArray[1] == geneArray[2] == geneArray[3]){
			return true;
		} else {
			return false;
		}
	}

	self.outputCattributes = function(KaiGroups){
		var geneArrays = [];
		for (var group in KaiGroups){
			//console.log("Now looking at the " + geneGroupNames[group]);
			if(group == 0){
				geneArrays.push(self.outputGroupAttribute(KaiGroups[group],unknownGeneNames));
			} else if (group == 1){
				geneArrays.push(self.outputGroupAttribute(KaiGroups[group],secretGeneNames));
			} else if (group == 2){
				geneArrays.push(self.outputGroupAttribute(KaiGroups[group],environmentGeneNames))
			} else if (group == 3){
				geneArrays.push(self.outputGroupAttribute(KaiGroups[group],mouthGeneNames));
			} else if (group == 4){
				geneArrays.push(self.outputGroupAttribute(KaiGroups[group],wildGeneNames));
			} else if (group == 5){
				geneArrays.push(self.outputGroupAttribute(KaiGroups[group],colorTertiaryGeneNames));
			} else if (group == 6){
				geneArrays.push(self.outputGroupAttribute(KaiGroups[group],colorSecondaryGeneNames));
			} else if (group == 7){
				geneArrays.push(self.outputGroupAttribute(KaiGroups[group],colorPrimaryGeneNames));
			} else if (group == 8){
				geneArrays.push(self.outputGroupAttribute(KaiGroups[group],eyesGeneNames));
			} else if (group == 9){
				geneArrays.push(self.outputGroupAttribute(KaiGroups[group],colorEyesGeneNames));
			} else if (group == 10){
				geneArrays.push(self.outputGroupAttribute(KaiGroups[group],patternGeneNames));
			} else if (group == 11){
				geneArrays.push(self.outputGroupAttribute(KaiGroups[group],bodyGeneNames));
			}
		}

		return geneArrays;
	}

	self.probeCattributes = function(KaiGroups){
		var geneArrays = [];
		for (var group in KaiGroups){
			//console.log("Now looking at the " + geneGroupNames[group]);
			if(group == 0){
				geneArrays.push(self.checkGroupAttribute(KaiGroups[group],unknownGeneNames));
			} else if (group == 1){
				geneArrays.push(self.checkGroupAttribute(KaiGroups[group],secretGeneNames));
			} else if (group == 2){
				geneArrays.push(self.checkGroupAttribute(KaiGroups[group],environmentGeneNames))
			} else if (group == 3){
				geneArrays.push(self.checkGroupAttribute(KaiGroups[group],mouthGeneNames));
			} else if (group == 4){
				geneArrays.push(self.checkGroupAttribute(KaiGroups[group],wildGeneNames));
			} else if (group == 5){
				geneArrays.push(self.checkGroupAttribute(KaiGroups[group],colorTertiaryGeneNames));
			} else if (group == 6){
				geneArrays.push(self.checkGroupAttribute(KaiGroups[group],colorSecondaryGeneNames));
			} else if (group == 7){
				geneArrays.push(self.checkGroupAttribute(KaiGroups[group],colorPrimaryGeneNames));
			} else if (group == 8){
				geneArrays.push(self.checkGroupAttribute(KaiGroups[group],eyesGeneNames));
			} else if (group == 9){
				geneArrays.push(self.checkGroupAttribute(KaiGroups[group],colorEyesGeneNames));
			} else if (group == 10){
				geneArrays.push(self.checkGroupAttribute(KaiGroups[group],patternGeneNames));
			} else if (group == 11){
				geneArrays.push(self.checkGroupAttribute(KaiGroups[group],bodyGeneNames));
			}
		}
		console.log("Done probing!");
		return geneArrays;
	}
	self.b58Dict = {'0':'1','1':'2','2':'3','3':'4','4':'5','5':'6','6':'7','7':'8','8':'9','9':'a',
	'10':'b','11': 'c', '12': 'd', '13': 'e', '14':'f','15':'g','16':'h','17':'i', '18':'j','19':'k',
	'20':'m','21':'n','22':'o','23':'p','24':'q','25':'r','26':'s','27':'t','28':'u', '29':'v', '30':'w'};

	function isEven(n) {
	   return n % 2 == 0;
	}

	function isOdd(n) {
	   return Math.abs(n % 2) == 1;
	}

	self.extremeCheck = function(traitA, traitB){
		var extremeList = ["Chartreux","Otaku","Harbourfog","Hintomint","Dragonfruit","Butterscotch","Wild_7","Wild_a","Wasntme","Violet","Mystery_8"];

		return (extremeList.includes(traitA) || extremeList.includes(traitB));
	}

	self.rareCheck = function(traitA, traitB){
		var rareList = ["Belch","Beard","Peach","Emeraldgreen","Missmuffett","Nachocheez","Springcrocus","Serpent","Caffeine","Baddate","Forgetmenot","Camo","Calicool"];

		return (rareList.includes(traitA) || rareList.includes(traitB));
	}

	self.mutationMatcher = function(kitten_1, kitten_2){

		var noPointers = ["Happygokitty","Soserious","Chronic","Slyboots","Cottoncandy","Mauveover","Crazy","Thicccbrowz","Wild_f","Wild_g"];
		//var noPointers = [];
		var nameLookup = {};
		nameLookup[0] = unknownGeneNames;
		nameLookup[1] = secretGeneNames;
		nameLookup[2] = environmentGeneNames;
		nameLookup[3] = mouthGeneNames;
		nameLookup[4] = wildGeneNames;
		nameLookup[5] = colorTertiaryGeneNames;
		nameLookup[6] = colorSecondaryGeneNames;
		nameLookup[7] = colorPrimaryGeneNames;
		nameLookup[8] = eyesGeneNames;
		nameLookup[9] = colorEyesGeneNames;
		nameLookup[10] = patternGeneNames;
		nameLookup[11] = bodyGeneNames;

		//geneArrays = self.getCattributes(self.getKaiGroups(kitten_1)); 
		KaiGroups = self.getKaiGroups(kitten_1);
		KaiGroups_2 = self.getKaiGroups(kitten_2);
		var mutationPoints = 0.0;
		var mutations = 0;
		var possibleMutations = 0;

		var mutationAmountTreshold = kitten_1.generation;
		for(var KaiGroupNumber in KaiGroups){
			KaiGroup = KaiGroups[KaiGroupNumber];
			geneArray = self.outputGroupAttribute(KaiGroup, nameLookup[KaiGroupNumber]);
			attrList = nameLookup[KaiGroupNumber];
			for(var genenumber in geneArray){
				gene = KaiGroup[genenumber];
				var isValid = true;
				if(noPointers.includes(invert(attrList)[gene])){
					isValid = false;
				}
				geneInInteger = invert(self.b58Dict)[gene];
				otherCatGene = KaiGroups_2[KaiGroupNumber][genenumber];
				secondGeneInInteger = invert(self.b58Dict)[otherCatGene]
				var numberCheck = ((genenumber == 3) && (KaiGroupNumber >= 2));
				if(secondGeneInInteger > 15 && numberCheck){
					//mutationPoints += 0.33;
					mutations += 1;
				} else if(secondGeneInInteger > 23 && numberCheck){
					//mutationPoints += 0.33;
					mutations += 1;
				} else if(secondGeneInInteger > 27 && numberCheck){
					//mutationPoints += 0.33;
					mutations += 1;
				} else if(isEven(geneInInteger)){
					if(secondGeneInInteger == (geneInInteger+1)){
						if(KaiGroupNumber >= 2 && isValid){
							modifier = 1;
							if(self.extremeCheck(gene, otherCatGene)){
								modifier = 50;
							}

							if(self.rareCheck(gene, otherCatGene)){
								modifier = 25;
							}
							if(genenumber == 0){
								mutationPoints += 0.007*(modifier);
							} else if (genenumber == 1){
								mutationPoints += 0.03*(modifier/2);
							} else if (genenumber == 2){
								mutationPoints += 0.12;
							} else if (genenumber == 3){
								mutationPoints += 0.33;
								//mutationPoints += 0;
							}	


						}
								
						//mutationPoints += 0.25*(1+genenumber);
					}

					

				} else {
					if(secondGeneInInteger == (geneInInteger-1)){
						if(KaiGroupNumber >= 2 && isValid){

							modifier = 1;
							if(self.extremeCheck(gene, otherCatGene)){
								modifier = 50;
							}

							if(self.rareCheck(gene, otherCatGene)){
								modifier = 25;
							}

							if(genenumber == 0){
								mutationPoints += 0.007*(modifier);
							} else if (genenumber == 1){
								mutationPoints += 0.03*(modifier/2);
							} else if (genenumber == 2){
								mutationPoints += 0.12;
							} else if (genenumber == 3){
								mutationPoints += 0.33;
								//mutationPoints += 0;
							}
						}
						//mutationPoints += 0.25*(1+genenumber);
					}
				}

				if(mutations < mutationAmountTreshold){
					mutationPoints = 0;
				}

			}
		}

		return mutationPoints;
	}

	self.traitChance = function(kitten, trait, groupNumber, KaiGroups){
		var nameLookup = {};
		nameLookup[0] = unknownGeneNames;
		nameLookup[1] = secretGeneNames;
		nameLookup[2] = environmentGeneNames;
		nameLookup[3] = mouthGeneNames;
		nameLookup[4] = wildGeneNames;
		nameLookup[5] = colorTertiaryGeneNames;
		nameLookup[6] = colorSecondaryGeneNames;
		nameLookup[7] = colorPrimaryGeneNames;
		nameLookup[8] = eyesGeneNames;
		nameLookup[9] = colorEyesGeneNames;
		nameLookup[10] = patternGeneNames;
		nameLookup[11] = bodyGeneNames;

		var group = KaiGroups[groupNumber];

		var geneArray = self.outputGroupAttribute(group, nameLookup[groupNumber] );
		var chanceOfTrait = 0.0;

		for (var gene in geneArray){
			if(geneArray[gene] == trait){
				chanceOfTrait += genePercentages[gene];
			}
		}


		kitten.chanceOfTrait[trait] = chanceOfTrait;

		return kitten;
	}

	self.simpleChanceOfTrait = function(geneArray, trait){
		var chanceOfTrait = 0.0;
		for (var gene in geneArray){
			if(geneArray[gene] == trait){
				chanceOfTrait += genePercentages[gene];
			}
		}
		return chanceOfTrait;
	}

	function isEmptyObject( obj ) {
	    for ( var name in obj ) {
	        return false;
	    }
	    return true;
	}
	self.simpleFilter = function(kitten, targetedTraits){
		geneArrays = self.readKitten(kitten);
		var traitChances = {};
		for(var trait in targetedTraits){
			for(var gArray in geneArrays){
				var chance = self.simpleChanceOfTrait(geneArrays[gArray],targetedTraits[trait]);
				if(chance != 0.0){
					traitChances[targetedTraits[trait]] = chance;  
				}
			}
			//if(!isEmptyObject(traitChances)){
			//	console.log(traitChances);
			//}
			kitten.chanceOfTrait = traitChances;
		}
		return kitten;
	}

	self.statistics = function(cats, place){
		statsDictionary = {};
		for(var cat in cats){
			cat = cats[cat];
			geneArrays = self.readKitten(cat);
			for(var gArray in geneArrays){
				gArray = geneArrays[gArray];
				if(statsDictionary[gArray[place]]){
					statsDictionary[gArray[place]] = statsDictionary[gArray[place]] + 1;
				} else {
					statsDictionary[gArray[place]] = 1;
				}
			}
		}
		console.log("Wall of stats:");
		//console.log(statsDictionary);
		return statsDictionary;
	}

	self.getKaiGroups = function(kitten){
		var KAISequence = self.translateGenesToKai(kitten.genes);
		var KaiGroups = [];
		for(var x = 0; x<KAISequence.length/4; x++){
			var nextGroup = KAISequence.substring(x*4,(x+1)*4);
			KaiGroups.push(nextGroup);
		}

		return KaiGroups;
	}
	self.readKitten = function (kitten){
		var testKaiSequence = "9ac9558524a2f4fad8185144f97c17513483441qdgdagegg";
		var KAISequence = self.translateGenesToKai(kitten.genes);

		//KAISequence = testKaiSequence;
		var KaiGroups = [];
		for(var x = 0; x<KAISequence.length/4; x++){
			var nextGroup = KAISequence.substring(x*4,(x+1)*4);
			KaiGroups.push(nextGroup);
		}
		//console.log("Kaisequence in groups is: " + KaiGroups);

		var geneArrays = self.outputCattributes(KaiGroups);

		return geneArrays;


	}
	return self;
}

module.exports = GeneDecoder;
