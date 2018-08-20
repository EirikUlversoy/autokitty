var net = require('net');
var Web3 = require("web3");
var bs58 = require('bs58');
var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net));
var Promise = require("bluebird");
var hexToBinary = require('hex-to-binary');
var Comparators = require("../ak-comparators");

function GeneDecoder(){
	let self = {};


	self.highest_gene_position_dict_creator = function(){
		self.highest_gene_positions = {};
		self.highest_gene_positions["Unknown_4"] = "R3";
		self.highest_gene_positions["Unknown_7"] = "R3";
		self.highest_gene_positions["Secret_1"] = "R3";
		self.highest_gene_positions["Secret_a"] = "R3";
		self.highest_gene_positions["Environment_6"] = "R3";
		self.highest_gene_positions["Environment_8"] = "R3";
		self.highest_gene_positions["Wasntme"] = "R3";
		self.highest_gene_positions["Wild_7"] = "R3";
		self.highest_gene_positions["Wild_a"] = "R3";
		self.highest_gene_positions["Butterscotch"] = "R3";
		self.highest_gene_positions["Harbourfog"] = "R3";
		self.highest_gene_positions["Dragonfruit"] = "R3";
		self.highest_gene_positions["Hintomint"] = "R3";
		self.highest_gene_positions["Otaku"] = "R3";
		self.highest_gene_positions["Wowza"] = "R3";
		self.highest_gene_positions["Chartreux"] = "R3";

		self.highest_gene_positions["Unknown_5"] = "R2";
		self.highest_gene_positions["Unknown_g"] = "R2";
		self.highest_gene_positions["Secret_9"] = "R2";
		self.highest_gene_positions["Environment_b"] = "R2";
		self.highest_gene_positions["Environment_d"] = "R2";
		self.highest_gene_positions["Belch"] = "R2";
		self.highest_gene_positions["Beard"] = "R2";
		self.highest_gene_positions["Wild_2"] = "R2";
		self.highest_gene_positions["Peach"] = "R2";
		self.highest_gene_positions["Emeraldgreen"] = "R2";
		self.highest_gene_positions["Missmuffett"] = "R2";
		self.highest_gene_positions["Springcrocus"] = "R2";
		self.highest_gene_positions["Violet"] = "R2";
		self.highest_gene_positions["Nachocheez"] = "R2";
		self.highest_gene_positions["Serpent"] = "R2";
		self.highest_gene_positions["Caffeine"] = "R2";
		self.highest_gene_positions["Baddate"] = "R2";
		self.highest_gene_positions["Forgetmenot"] = "R2";
		self.highest_gene_positions["Camo"] = "R2";
		self.highest_gene_positions["Calicool"] = "R2";
		self.highest_gene_positions["Manul"] = "R2";

		self.highest_gene_positions["Secret_e"] = "R1";
		self.highest_gene_positions["Environment_1"] = "R1";
		self.highest_gene_positions["Whixtensions"] = "R1";
		self.highest_gene_positions["Gerbil"] = "R1";
		self.highest_gene_positions["Rollercoaster"] = "R1";
		self.highest_gene_positions["Wild_3"] = "R1";
		self.highest_gene_positions["Wild_e"] = "R1";
		self.highest_gene_positions["Belleblue"] = "R1";
		self.highest_gene_positions["Shale"] = "R1";
		self.highest_gene_positions["Poisonberry"] = "R1";
		self.highest_gene_positions["Lilac"] = "R1";
		self.highest_gene_positions["Apricot"] = "R1";
		self.highest_gene_positions["Padparadscha"] = "R1";
		self.highest_gene_positions["Scarlet"] = "R1";
		self.highest_gene_positions["Barkbrown"] = "R1";
		self.highest_gene_positions["Swarley"] = "R1";
		self.highest_gene_positions["Simple"] = "R1";
		self.highest_gene_positions["Stunned"] = "R1";
		self.highest_gene_positions["Chestnut"] = "R1";
		self.highest_gene_positions["Doridnudibranch"] = "R1";
		self.highest_gene_positions["Ganado"] = "R1";
		self.highest_gene_positions["Spock"] = "R1";
		self.highest_gene_positions["Savannah"] = "R1";
		
		self.highest_gene_positions["Vigilante"] = "R3";
		self.highest_gene_positions["Cyborg"] = "R3";

		self.highest_gene_positions["Unknown_9"] = "D";
		self.highest_gene_positions["Unknown_a"] = "D";
		
		self.highest_gene_positions["Unknown_5"] = "R2";

		return self.highest_gene_positions;

	}


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
		bodyGeneNames["Manul"] = "7";
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
		bodyGeneNames["Balinese"] = "k";
		bodyGeneNames["Non-rel_body_m"] = "m";
		bodyGeneNames["Mainecoon"] = "n";
		bodyGeneNames["Laperm"] = "o";
		bodyGeneNames["Persian"] = "p";
		bodyGeneNames["Non-rel_body_q"] = "q";
		bodyGeneNames["Kurilian"] = "r";
		bodyGeneNames["Non-rel_body_s"] = "s";
		bodyGeneNames["Manx"] = "t";
		bodyGeneNames["Non-rel_body_u"] = "u";
		bodyGeneNames["Non-rel_body_v"] = "v";
		bodyGeneNames["Non-rel_body_w"] = "w";

		patternGeneNames["Vigilante"] = "1";
		patternGeneNames["Tiger"] = "2";
		patternGeneNames["Rascal"] = "3";
		patternGeneNames["Ganado"] = "4";
		patternGeneNames["Leopard"] = "5";
		patternGeneNames["Camo"] = "6";
		patternGeneNames["Rorschach"] = "7";
		patternGeneNames["Spangled"] = "8";
		patternGeneNames["Calicool"] = "9";
		patternGeneNames["Luckystripe"] = "a";
		patternGeneNames["Amur"] = "b";
		patternGeneNames["Jaguar"] = "c";
		patternGeneNames["Spock"] = "d";
		patternGeneNames["Non-rel_pattern_e"] = "e";
		patternGeneNames["Totesbasic_f"] = "f";
		patternGeneNames["Totesbasic_g"] = "g";
		patternGeneNames["Splat"] = "h";
		patternGeneNames["Thunderstruck"] = "i";
		patternGeneNames["Dippedcone"] = "j";
		patternGeneNames["Highsociety"] = "k";
		patternGeneNames["Tigerpunk"] = "m";
		patternGeneNames["Henna"] = "n";
		patternGeneNames["Non-rel_pattern_o"] = "o";
		patternGeneNames["Totesbasic_p"] = "p";
		patternGeneNames["Scorpius"] = "q";
		patternGeneNames["Razzledazzle"] = "r";
		patternGeneNames["Hotrod"] = "s";
		patternGeneNames["Non-rel_pattern_t"] = "t";
		patternGeneNames["Avatar"] = "u";
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
		colorEyesGeneNames["Dahlia"] = "b";
		colorEyesGeneNames["Coralsunrise"] = "c";
		colorEyesGeneNames["Olive"] = "d";
		colorEyesGeneNames["Doridnudibranch"] = "e";
		colorEyesGeneNames["Parakeet"] = "f";
		colorEyesGeneNames["Cyan"] = "g";
		colorEyesGeneNames["Pumpkin"] = "h";
		colorEyesGeneNames["Limegreen"] = "i";
		colorEyesGeneNames["Non-rel_eyecolor_j"] = "j";
		colorEyesGeneNames["Bubblegum"] = "k";
		colorEyesGeneNames["Twilightsparkle"] = "m";
		colorEyesGeneNames["Palejade"] = "n";
		colorEyesGeneNames["Pinefresh"] = "o";
		colorEyesGeneNames["Eclipse"] = "p";
		colorEyesGeneNames["Babypuke"] = "q";
		colorEyesGeneNames["Non-rel_eyecolor_r"] = "r";
		colorEyesGeneNames["Autumnmoon"] = "s";
		colorEyesGeneNames["Oasis"] = "t";
		colorEyesGeneNames["Non-rel_eyecolor_u"] = "u";
		colorEyesGeneNames["Dioscuri"] = "v";
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
		eyesGeneNames["Wowza"] = "a";
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
		eyesGeneNames["Tendertears"] = "m";
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
		colorPrimaryGeneNames["Tundra"] = "c";
		colorPrimaryGeneNames["Brownies"] = "d";
		colorPrimaryGeneNames["Dragonfruit"] = "e";
		colorPrimaryGeneNames["Hintomint"] = "f";
		colorPrimaryGeneNames["Bananacream"] = "g";
		colorPrimaryGeneNames["Cloudwhite"] = "h";
		colorPrimaryGeneNames["Non-rel_primarycolor_i"] = "i";
		colorPrimaryGeneNames["Oldlace"] = "j";
		colorPrimaryGeneNames["Koala"] = "k";
		colorPrimaryGeneNames["Lavender"] = "m";
		colorPrimaryGeneNames["Glacier"] = "n";
		colorPrimaryGeneNames["Redvelvet"] = "o";
		colorPrimaryGeneNames["Verdigris"] = "p";
		colorPrimaryGeneNames["Non-rel_primarycolor_q"] = "q";
		colorPrimaryGeneNames["Onyx"] = "r";
		colorPrimaryGeneNames["Hyacinth"] = "s";
		colorPrimaryGeneNames["Martian"] = "t";
		colorPrimaryGeneNames["Non-rel_primarycolor_u"] = "u";
		colorPrimaryGeneNames["Shamrock"] = "v";
		colorPrimaryGeneNames["Non-rel_primarycolor_w"] = "w";


		colorSecondaryGeneNames["Cyborg"] = "1";
		colorSecondaryGeneNames["Springcrocus"] = "2";
		colorSecondaryGeneNames["Egyptiankohl"] = "3";
		colorSecondaryGeneNames["Poisonberry"] = "4";
		colorSecondaryGeneNames["Lilac"] = "5";
		colorSecondaryGeneNames["Apricot"] = "6";
		colorSecondaryGeneNames["Royalpurple"] = "7";
		colorSecondaryGeneNames["Padparadscha"] = "8";
		colorSecondaryGeneNames["Swampgreen"] = "9";
		colorSecondaryGeneNames["Violet"] = "a";
		colorSecondaryGeneNames["Scarlet"] = "b";
		colorSecondaryGeneNames["Barkbrown"] = "c";
		colorSecondaryGeneNames["Coffee"] = "d";
		colorSecondaryGeneNames["Lemonade"] = "e";
		colorSecondaryGeneNames["Chocolate"] = "f";
		colorSecondaryGeneNames["Butterscotch"] = "g";
		colorSecondaryGeneNames["Ooze"] = "h";
		colorSecondaryGeneNames["Safetyvest"] = "i";
		colorSecondaryGeneNames["Turtleback"] = "j";
		colorSecondaryGeneNames["Rosequartz"] = "k";
		colorSecondaryGeneNames["Wolfgrey"] = "m";
		colorSecondaryGeneNames["Cerulian"] = "n";
		colorSecondaryGeneNames["Skyblue"] = "o";
		colorSecondaryGeneNames["Garnet"] = "p";
		colorSecondaryGeneNames["Peppermint"] = "q";
		colorSecondaryGeneNames["Universe"] = "r";
		colorSecondaryGeneNames["Royalblue"] = "s";
		colorSecondaryGeneNames["Mertail"] = "t";
		colorSecondaryGeneNames["Inflatablepool"] = "u";
		colorSecondaryGeneNames["Pearl"] = "v";
		colorSecondaryGeneNames["Prairierose"] = "w";


		colorTertiaryGeneNames["Belleblue"] = "1";
		colorTertiaryGeneNames["Sandalwood"] = "2";
		colorTertiaryGeneNames["Peach"] = "3";
		colorTertiaryGeneNames["Icy"] = "4";
		colorTertiaryGeneNames["Granitegrey"] = "5";
		colorTertiaryGeneNames["Cashewmilk"] = "6";
		colorTertiaryGeneNames["Kittencream"] = "7";
		colorTertiaryGeneNames["Emeraldgreen"] = "8";
		colorTertiaryGeneNames["Kalahari"] = "9";
		colorTertiaryGeneNames["Shale"] = "a";
		colorTertiaryGeneNames["Purplehaze"] = "b";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_c"] = "c";
		colorTertiaryGeneNames["Azaleablush"] = "d";
		colorTertiaryGeneNames["Missmuffett"] = "e";
		colorTertiaryGeneNames["Morningglory"] = "f";
		colorTertiaryGeneNames["Frosting"] = "g";
		colorTertiaryGeneNames["Daffodil"] = "h";
		colorTertiaryGeneNames["Flamingo"] = "i";
		colorTertiaryGeneNames["Buttercup"] = "j";
		colorTertiaryGeneNames["Bloodred"] = "k";
		colorTertiaryGeneNames["Atlantis"] = "m";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_n"] = "n";
		colorTertiaryGeneNames["Periwinkle"] = "o";
		colorTertiaryGeneNames["Patrickstarfish"] = "p";
		colorTertiaryGeneNames["Seafoam"] = "q";
		colorTertiaryGeneNames["Cobalt"] = "r";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_s"] = "s";
		colorTertiaryGeneNames["Mintmacaron"] = "t";
		colorTertiaryGeneNames["Sully"] = "u";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_v"] = "v";
		colorTertiaryGeneNames["Non-rel_tertiarycolor_w"] = "w";

		wildGeneNames["Wild_1"] = "1";
		wildGeneNames["Wild_2"] = "2";
		wildGeneNames["Wild_3"] = "3";
		wildGeneNames["Wild_4"] = "4";
		wildGeneNames["Non-rel_wild_5"] = "5";
		wildGeneNames["Wild_6"] = "6";
		wildGeneNames["Wild_7"] = "7";
		wildGeneNames["Wild_8"] = "8";
		wildGeneNames["Wild_9"] = "9";
		wildGeneNames["Wild_a"] = "a";
		wildGeneNames["Non-rel_wild_b"] = "b";
		wildGeneNames["Wild_c"] = "c";
		wildGeneNames["Wild_d"] = "d";
		wildGeneNames["Wild_e"] = "e";
		wildGeneNames["Wild_f"] = "f";
		wildGeneNames["Wild_g"] = "g";
		wildGeneNames["Littlefoot"] = "h";
		wildGeneNames["Elk"] = "i";
		wildGeneNames["Non-rel_wild_j"] = "j";
		wildGeneNames["Trioculus"] = "k";
		wildGeneNames["Daemonwings"] = "m";
		wildGeneNames["Non-rel_wild_n"] = "n";
		wildGeneNames["Flapflap"] = "o";
		wildGeneNames["Daemonhorns"] = "p";
		wildGeneNames["Dragontail"] = "q";
		wildGeneNames["Non-rel_wild_r"] = "r";
		wildGeneNames["Non-rel_wild_s"] = "s";
		wildGeneNames["Unicorn"] = "t";
		wildGeneNames["Non-rel_wild_u"] = "u";
		wildGeneNames["Non-rel_wild_v"] = "v";
		wildGeneNames["Non-rel_wild_w"] = "w";

		mouthGeneNames["Whixtensions"] = "1";
		mouthGeneNames["Wasntme"] = "2";
		mouthGeneNames["Wuvme"] = "3";
		mouthGeneNames["Gerbil"] = "4";
		mouthGeneNames["Confuzzled"] = "5";
		mouthGeneNames["Impish"] = "6";
		mouthGeneNames["Belch"] = "7";
		mouthGeneNames["Rollercoaster"] = "8";
		mouthGeneNames["Beard"] = "9";
		mouthGeneNames["Pouty"] = "a";
		mouthGeneNames["Saycheese"] = "b";
		mouthGeneNames["Grim"] = "c";
		mouthGeneNames["Fangtastic"] = "d";
		mouthGeneNames["Non-rel_mouth_e"] = "e";
		mouthGeneNames["Happygokitty"] = "f";
		mouthGeneNames["Soserious"] = "g";
		mouthGeneNames["Cheeky"] = "h";
		mouthGeneNames["Starstruck"] = "i";
		mouthGeneNames["Samwise"] = "j";
		mouthGeneNames["Ruhroh"] = "k";
		mouthGeneNames["Dali"] = "m";
		mouthGeneNames["Grimace"] = "n";
		mouthGeneNames["Non-rel_mouth_o"] = "o";
		mouthGeneNames["Tongue"] = "p";
		mouthGeneNames["Yokel"] = "q";
		mouthGeneNames["Topoftheworld"] = "r";
		mouthGeneNames["Neckbeard"] = "s";
		mouthGeneNames["Non-rel_mouth_t"] = "t";
		mouthGeneNames["Walrus"] = "u";
		mouthGeneNames["Non-rel_mouth_v"] = "v";
		mouthGeneNames["Non-rel_mouth_w"] = "w";

		environmentGeneNames["Environment_1"] = "1";
		environmentGeneNames["Environment_2"] = "2";
		environmentGeneNames["Non-rel_environment_3"] = "3";
		environmentGeneNames["Environment_4"] = "4";
		environmentGeneNames["Environment_5"] = "5";
		environmentGeneNames["Environment_6"] = "6";
		environmentGeneNames["Environment_7"] = "7";
		environmentGeneNames["Environment_8"] = "8";
		environmentGeneNames["Non-rel_environment_9"] = "9";
		environmentGeneNames["Environment_a"] = "a";
		environmentGeneNames["Environment_b"] = "b";
		environmentGeneNames["Environment_c"] = "c";
		environmentGeneNames["Environment_d"] = "d";
		environmentGeneNames["Non-rel_environment_e"] = "e";
		environmentGeneNames["Environment_f"] = "f";
		environmentGeneNames["Enivonment_g"] = "g";
		environmentGeneNames["Salty"] = "h";
		environmentGeneNames["Non-rel_environment_i"] = "i";
		environmentGeneNames["Juju"] = "j";
		environmentGeneNames["Tinybox"] = "k";
		environmentGeneNames["Non-rel_environment_m"] = "m";
		environmentGeneNames["Finalfrontier"] = "n";
		environmentGeneNames["Non-rel_environment_o"] = "o";
		environmentGeneNames["Drift"] = "p";
		environmentGeneNames["Non-rel_environment_q"] = "q";
		environmentGeneNames["Frozen"] = "r";
		environmentGeneNames["Non-rel_environment_s"] = "s";
		environmentGeneNames["Non-rel_environment_t"] = "t";
		environmentGeneNames["Non-rel_environment_u"] = "u";
		environmentGeneNames["Non-rel_environment_v"] = "v";
		environmentGeneNames["Non-rel_environment_w"] = "w";

		secretGeneNames["Secret_1"] = "1";
		secretGeneNames["Secret_2"] = "2";
		secretGeneNames["Secret_3"] = "3";
		secretGeneNames["Non-rel_secret_4"] = "4";
		secretGeneNames["Secret_5"] = "5";
		secretGeneNames["Secret_6"] = "6";
		secretGeneNames["Secret_7"] = "7";
		secretGeneNames["Secret_8"] = "8";
		secretGeneNames["Secret_9"] = "9";
		secretGeneNames["Secret_a"] = "a";
		secretGeneNames["Non-rel_secret_b"] = "b";
		secretGeneNames["Secret_c"] = "c";
		secretGeneNames["Non-rel_secret_d"] = "d";
		secretGeneNames["Secret_e"] = "e";
		secretGeneNames["Secret_f"] = "f";
		secretGeneNames["Secret_g"] = "g";
		secretGeneNames["Secret_h"] = "h";
		secretGeneNames["Non-rel_secret_i"] = "i";
		secretGeneNames["Secret_j"] = "j";
		secretGeneNames["Secret_k"] = "k";
		secretGeneNames["Secret_m"] = "m";
		secretGeneNames["Non-rel_secret_n"] = "n";
		secretGeneNames["Non-rel_secret_o"] = "o";
		secretGeneNames["Secret_p"] = "p";
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
		unknownGeneNames["Unknown_4"] = "4";
		unknownGeneNames["Unknown_5"] = "5";
		unknownGeneNames["Non-rel_unknown_6"] = "6";
		unknownGeneNames["Unknown_7"] = "7";
		unknownGeneNames["Non-rel_unknown_8"] = "8";
		unknownGeneNames["Unknown_9"] = "9";
		unknownGeneNames["Unknown_a"] = "a";
		unknownGeneNames["Non-rel_unknown_b"] = "b";
		unknownGeneNames["Unknown_c"] = "c";
		unknownGeneNames["Unknown_d"] = "d";
		unknownGeneNames["Unknown_e"] = "e";
		unknownGeneNames["Non-rel_unknown_f"] = "f";
		unknownGeneNames["Unknown_g"] = "g";
		unknownGeneNames["Non-rel_unknown_h"] = "h";
		unknownGeneNames["Non-rel_unknown_i"] = "i";
		unknownGeneNames["Non-rel_unknown_j"] = "j";
		unknownGeneNames["Non-rel_unknown_k"] = "k";
		unknownGeneNames["Unknown_m"] = "m";
		unknownGeneNames["Non-rel_unknown_n"] = "n";
		unknownGeneNames["Unknown_o"] = "o";
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
		let target = geneArray[0];
		if((target == geneArray[1]) && (target == geneArray[2]) && (target == geneArray[3])){
			return true;
		} else {
			return false;
		}
	}

	self._isAlmostPureBred = function(geneArray){
		let target = geneArray[1];
		if((target == geneArray[2]) && (target == geneArray[3])){
			return true;
		} else {
			return false;
		}
	}

	self.newDiamondPrototypeFunction = function(cats, targetedTraits, cooldown){
		let new_cats = [];
		console.log(cats);
		for(var cat in cats){
			cat = cats[cat];
			new_cat = self.simpleFilter(cat, targetedTraits);

			if(new_cat.chanceOfTrait[targetedTraits] != undefined){
				
					new_cats.push(new_cat);
			}
		}
		let new_cats_fast = [];

		if(cooldown != undefined){
			let nr = parseInt(cooldown,10);
			for(let cat in new_cats){
				if(parseInt(new_cats[cat].cooldownIndex,10) <= nr){
					new_cats_fast.push(new_cats[cat]);
				}
			}
			new_cats = new_cats_fast;
		}

		var RankingModule = require('../ranking-module')(); 
		let scores = RankingModule.scoreCatsBasedOnTraits(new_cats, targetedTraits, targetedTraits);
		let sorted_scores = RankingModule.getSortedArrayOfScoredCatsFromDictionary(scores);

		return sorted_scores;

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
		var extremeList = ["Chartreux","Otaku","Harbourfog","Hintomint","Dragonfruit","Butterscotch","Wild_7","Wild_a","Wasntme","Violet","Environment_8"];

		return (extremeList.includes(traitA) || extremeList.includes(traitB));
	}

	self.rareCheck = function(traitA, traitB){
		var rareList = ["Belch","Beard","Peach","Emeraldgreen","Missmuffett","Nachocheez","Springcrocus","Serpent","Caffeine","Baddate","Forgetmenot","Camo","Calicool"];

		return (rareList.includes(traitA) || rareList.includes(traitB));
	}



	//Probably generation 0 only
	self.rareMutationMatcher = function(kitten_1, kitten_2){

		//var noPointers = ["Happygokitty","Soserious","Chronic","Slyboots","Cottoncandy","Mauveover","Crazy","Thicccbrowz","Wild_f","Wild_g"];
		var rThrees = ["Environment_6","Environment_8","Wasntme","Wild_7","Wild_a","Butterscotch","Harbourfog","Hintomint","Otaku","Chartreux","Wowza","Vigilante","Dragonfruit"];
		var rTwos = ["Environment_b","Belch","Beard","Peach","Emeraldgreen","Missmuffett","Springcrocus","Violet",
		"Nachocheez","Serpent","Caffeine","Baddate","Forgetmenot","Camo","Calicool","Manul","Wild_2"];
		var noPointers = [];
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
		mutationAmountTreshold = 0;
		for(var KaiGroupNumber in KaiGroups){
			KaiGroup = KaiGroups[KaiGroupNumber];
			geneArray = self.outputGroupAttribute(KaiGroup, nameLookup[KaiGroupNumber]);
			attrList = nameLookup[KaiGroupNumber];
			for(var genenumber in geneArray){
				gene = KaiGroup[genenumber];
				var isValid = false;
				if(rThrees.includes(invert(attrList)[gene]) || rTwos.includes(invert(attrList)[gene])){
					isValid = true;
				}
				geneInInteger = invert(self.b58Dict)[gene];
				otherCatGene = KaiGroups_2[KaiGroupNumber][genenumber];

				if(rThrees.includes(invert(attrList)[otherCatGene]) || rTwos.includes(invert(attrList)[otherCatGene])){
					isValid = true;
				}
				secondGeneInInteger = invert(self.b58Dict)[otherCatGene]
				var numberCheck = ((genenumber == 3) && (KaiGroupNumber >= 2));
				if(isEven(geneInInteger)){
					if(secondGeneInInteger == (geneInInteger+1)){
						if(KaiGroupNumber >= 2 && isValid){
							if(genenumber == 0){
								if(!rThrees.includes(invert(attrList)[otherCatGene]) && !rThrees.includes(invert(attrList)[gene])){
									mutationPoints += 0.007;
								} else {
									mutationPoints += 0.03;
								}
							} else if (genenumber == 1){
								mutationPoints += 0.03;
							}

						} else if (KaiGroupNumber >= 2){
							mutationPoints += 0.0005;
						}

						//mutationPoints += 0.25*(1+genenumber);
					}



				} else {
					if(secondGeneInInteger == (geneInInteger-1)){
						if(KaiGroupNumber >= 2 && isValid){
							if(genenumber == 0){
								if(!rThrees.includes(invert(attrList)[otherCatGene]) && !rThrees.includes(invert(attrList)[gene])){
									mutationPoints += 0.007;
								} else {
									mutationPoints += 0.03;
								}
							} else if (genenumber == 1){
								mutationPoints += 0.03;
							}

						} else if (KaiGroupNumber >= 2){
							mutationPoints += 0.0005;
						}
						//mutationPoints += 0.25*(1+genenumber);
					}
				}

				/*
				if(mutations < mutationAmountTreshold){
					mutationPoints = 0;
				}*/

			}
		}

		return mutationPoints;
	}

	self.filterByR1Count = function(cats, targetedTraits, dominantCount){
		var filteredCats = [];
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

		for(var cat in cats){
			KaiGroups = self.getKaiGroups(cats[cat]);
			var validCount = 0;

			for(var KaiGroupNumber in KaiGroups){
				KaiGroup = KaiGroups[KaiGroupNumber];
				gene = KaiGroup[2];
				geneD = KaiGroup[3];
				geneArray = self.outputGroupAttribute(KaiGroup, nameLookup[KaiGroupNumber]);

				for(var targetedTrait in targetedTraits){
					if(targetedTraits[targetedTrait] == geneArray[2] || targetedTraits[targetedTrait] == geneArray[3]){
						validCount += 1;
					}
				}
			}
			if(validCount >= dominantCount){
				filteredCats.push(cats[cat]);
			}
		}

		return filteredCats;
	}

	self.filterByR2Count = function(cats, targetedTraits, dominantCount){
		var filteredCats = [];
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

		for(var cat in cats){
			KaiGroups = self.getKaiGroups(cats[cat]);
			var validCount = 0;

			for(var KaiGroupNumber in KaiGroups){
				KaiGroup = KaiGroups[KaiGroupNumber];
				gene = KaiGroup[2];
				geneD = KaiGroup[3];
				geneArray = self.outputGroupAttribute(KaiGroup, nameLookup[KaiGroupNumber]);

				for(var targetedTrait in targetedTraits){
					if(targetedTraits[targetedTrait] == geneArray[2] || targetedTraits[targetedTrait] == geneArray[3] || targetedTraits[targetedTrait] == geneArray[1]){
						validCount += 1;
					}
				}
			}
			if(validCount >= dominantCount){
				filteredCats.push(cats[cat]);
			}
		}

		return filteredCats;
	}

	self.filterByDominantCount = function(cats, targetedTraits, dominantCount){
		var filteredCats = [];
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

		for(var cat in cats){
			KaiGroups = self.getKaiGroups(cats[cat]);
			var validCount = 0;

			for(var KaiGroupNumber in KaiGroups){
				KaiGroup = KaiGroups[KaiGroupNumber];
				gene = KaiGroup[3];
				geneArray = self.outputGroupAttribute(KaiGroup, nameLookup[KaiGroupNumber]);

				for(var targetedTrait in targetedTraits){
					if(targetedTraits[targetedTrait] == geneArray[3]){
						validCount += 1;
					}
				}
			}
			if(validCount >= dominantCount){
				filteredCats.push(cats[cat]);
			}
		}

		return filteredCats;
	}
	self.filterByMutaCount = function(cats, count){
		var filteredCats = [];
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

		for(var cat in cats){
			KaiGroups = self.getKaiGroups(cats[cat]);
			var mutaCount = 0;
			for(var KaiGroupNumber in KaiGroups){
				KaiGroup = KaiGroups[KaiGroupNumber];
				geneArray = self.outputGroupAttribute(KaiGroup, nameLookup[KaiGroupNumber]);
				gene = KaiGroup[3];
				geneInInteger = invert(self.b58Dict)[gene];
				if(geneInInteger > 15){
					mutaCount += 1;
				}	
			}

		if(mutaCount >= count){
			filteredCats.push(cats[cat]);
		}
		
		}

		return filteredCats;
	}

	self.findRarestTraitCombinations = function(cats){

		var afterEasterTraits = ["Caffeine", "Daemonwings", "Parakeet", "Eclipse", "Shale", "Daemonhorns", "Salty", "Cinderella", "Lavender","Swarley", "Oceanid", "Chameleon", "Bornwithit", "Highlander", "Koladiviya", "Pearl", "Mertail", "Garnet", "Butterscotch", "Tinybox", "Razzledazzle", "Rorschach", "Highsociety", "Dahlia", "Palejade", "Autumnmoon", "Flapflap", "Unicorn", "Manul", "Balinese", "Kurilian", "Cobalt", "Cashewmilk", "Buttercup", "Finalfrontier", "Impish", "Wowza", "Tendertears", "Brownies", "Redvelvet", "Martian", "Universe", "Rosequartz", "Padparadscha", "Littlefoot", "Dragontail"];
		traitDictionary = self.statistics(cats, 3);


		function compareSecondColumn(a, b) {
		    if (a[1] === b[1]) {
		        return 0;
		    }
		    else {
		        return (a[1] < b[1]) ? -1 : 1;
		    }
		}
		function sorter(traitDictionary){
			var scoreKeys = Object.keys(traitDictionary);
			var arrayOfTraits = [];
			for(var key in scoreKeys){
				key = scoreKeys[key];
				arrayOfTraits.push([key,traitDictionary[key]]);
			}

			arrayOfTraits.sort(compareSecondColumn);

			return arrayOfTraits;

		}

		var sortedTraits = sorter(traitDictionary);
		var sortedTraitsFiltered = [];
		for(var trait in sortedTraits){
			if(!afterEasterTraits.includes(sortedTraits[trait])){
				sortedTraitsFiltered.push(sortedTraits[trait]);
			}
		}

		for(var trait in sortedTraitsFiltered){
			trait = sortedTraitsFiltered[trait];
			
		}
	}

	self.mutationMatcher = function(kitten_1, kitten_2){

		var noPointers = [];
		var noPointers = ["Happygokitty","Soserious","Chronic","Slyboots","Cottoncandy","Mauveover","Crazy","Thicccbrowz","Wild_f","Wild_g"];
		var dominant = ["Saycheese","Grim","Happygokitty","Soserious","Wild_f","Wild_g","Morningglory","Frosting","Coffee","Lemonade",
		"Shadowgrey","Salmon","Cottoncandy","Mauveover","Crazy","Thicccbrowz","Chronic","Slyboots","Thundergrey","Topaz","Mintgreen","Parakeet","Cyan","Dahlia","Coralsunrise",
		"Rorschach","Spangled","Totesbasic_f","Totesbasic_g","Koladiviya","Bobtail","Ragamuffin","Ragdoll","Munchkin","Sphynx","Thundergrey","Gold"];
		noPointers = dominant;
		noPointers = [];
		if(kitten_1.generation > 0){
			noPointers = [];
		}
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
		var mutations_1 = 0;
		var mutations_2 = 0;
		var possibleMutations = 0;

		var mutationAmountTreshold = kitten_1.generation;
		mutationAmountTreshold = 0;
		if(kitten_1.generation == 0){
			mutationAmountTreshold = 0;
		}
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

				
				if(secondGeneInInteger > 15 && numberCheck && secondGeneInInteger <= 23){
					mutations_1 += 1;
				} else if(secondGeneInInteger > 23 && numberCheck && secondGeneInInteger <= 27){
					mutations_1 += 1;
				} else if(secondGeneInInteger > 27 && numberCheck){
					mutations_1 += 1;
				}

				if(geneInInteger > 15 && numberCheck && geneInInteger <= 23){
					mutations_2 += 1;
				} else if(geneInInteger > 23 && numberCheck && geneInInteger <= 27){
					mutations_2 += 1;
				} else if(geneInInteger > 27 && numberCheck){
					mutations_2 += 1;
				}

				if(isEven(geneInInteger)){
					if(secondGeneInInteger == (geneInInteger+1)){
						if(KaiGroupNumber >= 2 && isValid){
							if(genenumber == 0){
								mutationPoints += 0.007;
							} else if (genenumber == 1){
								mutationPoints += 0.03;
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
							if(genenumber == 0){
								mutationPoints += 0.007;
							} else if (genenumber == 1){
								mutationPoints += 0.03;
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

				
				if((mutations_1 < mutationAmountTreshold) || (mutations_2 < mutationAmountTreshold)){
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
	self.chanceOfTraitNoFilter = function(geneArray){
		var chanceOfTrait = 0.0;
		for (var gene in geneArray){
			chanceOfTrait += genePercentages[gene];

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
		for(var gArray in geneArrays){
			gArray = geneArrays[gArray];
			for(var gene in gArray){
				if(traitChances[gArray[gene]] != undefined){
					traitChances[gArray[gene]] += genePercentages[gene];
				} else {
					traitChances[gArray[gene]] = genePercentages[gene];
				}
			}

		}
			//if(!isEmptyObject(traitChances)){
			//	console.log(traitChances);
			//}
		kitten.chanceOfTrait = traitChances;

		return kitten;
	}
	self.notUnknownGroup = function(number){
		if(number >= 2){
			return true;
		} else {
			return false;
		}
	}

	function CatDetails(id, pureScore, pureBredNames, semiPureScore, semiPureBredNames, cat){
		this.id = id;
		this.pureScore = pureScore;
		this.pureBredNames = pureBredNames;
		this.semiPureScore = semiPureScore;
		this.semiPureBredNames = semiPureBredNames;
		this.cat = cat;

	}
	function float2int (value) {
	    return value | 0;
	}

	self.analyzer = function(cats){
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

		var catDetailsList = [];
		console.log("Entering cat analyze loop")
		for(var cat in cats){
			console.log("At cat: " + cat);
			var pureBredGroupAmount = 0;
			var pureBredNames = [];
			var semiPureBredGroupAmount = 0;
			var semiPureBredNames = [];
			cat = cats[cat];
			//geneArrays = self.readKitten(cat);
			KaiGroups = self.getKaiGroups(cat);

			for(var KaiGroupNumber in KaiGroups){
				if(KaiGroupNumber >= 2){

					KaiGroup = KaiGroups[KaiGroupNumber];
					geneArray = self.outputGroupAttribute(KaiGroup, nameLookup[KaiGroupNumber]);
					attrList = nameLookup[KaiGroupNumber];


					//gene = KaiGroup[genenumber];
					//var textualGeneArray = self.outputGroupAttribute(gArrayNumber, nameLookup[gArrayNumber] );
					console.log(geneArray);
					if(self._isPureBred(geneArray)){
						pureBredGroupAmount += 1;
						pureBredNames.push(geneArray[3]);
					} else if (self._isAlmostPureBred(geneArray)){
						semiPureBredGroupAmount += 1;
						semiPureBredNames.push(geneArray[2]);

					}
				}
			}

			if((pureBredGroupAmount > 0) ){//|| (semiPureBredGroupAmount > 0)){
				console.log("pushing?");
				catDetailsList.push(new CatDetails(cat.id, pureBredGroupAmount, pureBredNames, semiPureBredGroupAmount, semiPureBredNames, cat));
			}
		}

		//Top 10%
		let threshold = float2int(catDetailsList.length * 0.10);

		catDetailsList.sort(Comparators.keyComparator("pureScore"));

		console.log("Semipure or better: " + catDetailsList.length);
		for(var x = 0; x < threshold; x++){
			cat = catDetailsList[x];
			console.log("Cat id: " + cat.id + "\n Pscore: " + cat.pureScore + "\n Pnames: " + cat.pureBredNames
				+ "\n SPscore: " + cat.semiPureScore + "\n SPNames: " + cat.semiPureBredNames);
		}
	}

	self.getCatsWithDominantTrait = function(cats, trait){
		//oneTraitDictionary = {};
		let oneTraitList = [];
		for(var cat in cats){
			cat = cats[cat];
			geneArrays = self.readKitten(cat);
			for(var gArray in geneArrays){
				gArray = geneArrays[gArray];
				if(gArray[3] == trait){
					 
					oneTraitList.push(cat);
				}
			}
		}

		return oneTraitList;
	}

	self.analyzePossibleMutations = function (cats, mutationList, place){
		let mutaDict = {};
		let statsDictionary = self.statistics(cats, place);
		mutationKeys = Object.keys(mutationList);
		for(var mutationKey in mutationKeys){
			mutationKey = mutationKeys[mutationKey];
			mutation = mutationList[mutationKey];
			let tOne = mutation[0];
			let tTwo = mutation[1];
			tOneCount = statsDictionary[tOne];
			tTwoCount = statsDictionary[tTwo];
			if(tOneCount > 0 && tTwoCount > 0){
				if(tOneCount >= tTwoCount){
					mutaDict[mutationKey] = tTwoCount;
				} else {
					mutaDict[mutationKey] = tOneCount;
				}
			} else {
				mutaDict[mutationKey] = 0;
			}

		}

		return mutaDict;
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
		console.log(statsDictionary);
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
