
function MutationDictionaries(){
	var self = {};

	self.setupDictionaries = function(){
		let PremierMutations = {};

		PremierMutations["Secret_h"] = ["Secret_1","Secret_2"];
		PremierMutations["Norwegianforest"] = ["Savannah","Selkirk"];
		PremierMutations["Pumpkin"] = ["Thundergrey","Gold"];
		PremierMutations["Chameleon"] = ["Swarley","Wonky"];
		PremierMutations["Cloudwhite"] = ["Shadowgrey","Salmon"];
		PremierMutations["Daffodil"] = ["Belleblue","Sandalwood"];
		PremierMutations["Cheeky"] = ["Wasntme","Whixtensions"];
		PremierMutations["Salty"] = ["Mystery_1","Mystery_2"]

		PremierMutations["Thunderstruck"] = ["Rascal","Ganado"];
		PremierMutations["Limegreen"] = ["Topaz","Mintgreen"];
		PremierMutations["Alien"] = ["Serpent","Googly"];
		PremierMutations["Safetyvest"] = ["Egyptiankohl","Poisonberry"];
		PremierMutations["Flamingo"] = ["Peach","Icy"];
		PremierMutations["Elk"] = ["Wild_3","Wild_4"];
		PremierMutations["Starstruck"] = ["Wuvme","Gerbil"];

		PremierMutations["Highlander"] = ["Koladiviya","Bobtail"]
		PremierMutations["Dippedcone"] = ["Leopard","Camo"];
		PremierMutations["Fabulous"] = ["Otaku","Simple"];
		PremierMutations["Oldlace"] = ["Cottoncandy","Mauveover"];
		PremierMutations["Turtleback"] = ["Lilac","Apricot"];
		PremierMutations["Secret_j"] = ["Secret_5","Secret_6"];
		PremierMutations["Buttercup"] = ["Cashewmilk","Granitegrey"];

		PremierMutations["Balinese"] = ["Manul","Pixiebob"];
		PremierMutations["Highsociety"] = ["Rorschach","Spangled"];
		PremierMutations["Bubblegum"] = ["Chestnut","Strawberry"];
		PremierMutations["Raisedbrow"] = ["Crazy","Thicccbrowz"];
		PremierMutations["Koala"] = ["Aquamarine","Nachocheez"];
		PremierMutations["Bloodred"] = ["Kittencream","Emeraldgreen"];
		PremierMutations["Trioculus"] = ["Wild_7","Wild_8"];
		PremierMutations["Secret_k"] = ["Secret_7","Secret_8"];
		PremierMutations["Ruhroh"] = ["Rollercoaster","Belch"];
		PremierMutations["Tinybox"] = ["Mystery_7","Mystery_8"];
		PremierMutations["Pinefresh"] = ["Olive","Doridnudibranch"];
		PremierMutations["Drift"] = ["Environment_f","Environment_g"];

		PremierMutations["Tigerpunk"] = ["Luckystripe","Calicool"];
		PremierMutations["Twilightsparkle"] = ["Sapphire","Forgetmenot"];
		PremierMutations["Lavender"] = ["Harbourfog","Cinderella"];
		PremierMutations["Wolfgrey"] = ["Swampgreen","Violet"];
		PremierMutations["Tendertears"] = ["Caffeine","Wowza"];
		PremierMutations["Redvelvet"] = ["Dragonfruit","Brownies"];
		PremierMutations["Daemonwings"] = ["Wild_9","Wild_a"];
		PremierMutations["Dali"] = ["Beard","Pouty"];
		PremierMutations["Unknown_m"] = ["Unknown_9","Unknown_a"];

		PremierMutations["Mainecoon"] = ["Chartreux","Himalayan"];
		PremierMutations["Henna"] = ["Amur","Jaguar"];
		PremierMutations["Palejade"] = ["Dahlia","Coralsunrise"];
		PremierMutations["Cerulian"] = ["Scarlet","Barkbrown"];
		PremierMutations["Grimace"] = ["Saycheese","Grim"];
		PremierMutations["Finalfrontier"] = ["Environment_b","Environment_c"];
		PremierMutations["Glacier"] = ["Tundra","Greymatter"];
		PremierMutations["Laperm"] = ["Munchkin","Sphynx"];
		PremierMutations["Sass"] = ["Chronic","Slyboots"];
		PremierMutations["Skyblue"] = ["Coffee","Lemonade"];
		PremierMutations["Periwinkle"] = ["Azaleablush","Missmuffett"];
		PremierMutations["Flapflap"] = ["Wild_d","Wild_e"];

		PremierMutations["Persian"] = ["Ragamuffin","Ragdoll"];
		PremierMutations["Totesbasic_p"] = ["Totesbasic_f","Totesbasic_g"];
		PremierMutations["Eclipse"] = ["Parakeet","Cyan"];
		PremierMutations["Sweetmeloncakes"] = ["Wiley","Stunned"];
		PremierMutations["Verdigris"] = ["Hintomint","Bananacream"];
		PremierMutations["Garnet"] = ["Chocolate","Butterscotch"];
		PremierMutations["Patrickstarfish"] = ["Morningglory","Frosting"];
		PremierMutations["Daemonhorns"] = ["Wild_f","Wild_g"];
		PremierMutations["Tongue"] = ["Happygokitty","Soserious"];
		PremierMutations["Rosequartz"] = ["Royalpurple","Padparadscha"];
		PremierMutations["Splat"] = ["Vigilante","Tiger"];
		PremierMutations["Ooze"] = ["Cyborg","Springcrocus"];
		PremierMutations["Samwise"] = ["Confuzzled","Impish"];
		PremierMutations["Juju"] = ["Environment_5","Environment_6"];
		PremierMutations["Littlefoot"] = ["Wild_1","Wild_2"];
		PremierMutations["Combo3"] = ["Sully","Bornwithit"];
		PremierMutations["Peppermint"] = ["Ooze","Safetyvest"];
		PremierMutations["Inflatablepool"] = ["Peppermint","Universe"];
		PremierMutations["Mekong"] = ["Chantilly","Birman"];

		let	SecondaryMutations = {}
		SecondaryMutations["Babypuke"] = ["Pumpkin","Limegreen"];
		SecondaryMutations["Oceanid"] = ["Chameleon","Alien"];
		SecondaryMutations["Seafoam"] = ["Daffodil","Flamingo"];
		SecondaryMutations["Yokel"] = ["Cheeky","Starstruck"];
		SecondaryMutations["Hyacinth"] = ["Glacier","Lavender"];
		SecondaryMutations["Razzledazzle"] = ["Dippedcone","Highsociety"];
		SecondaryMutations["Wingtips"] = ["Fabulous","Raisedbrow"]
		SecondaryMutations["Onyx"] = ["Oldlace","Koala"];
		SecondaryMutations["Secret_r"] = ["Secret_j","Secret_k"];
		SecondaryMutations["Kurilian"] = ["Highlander","Balinese"];
		SecondaryMutations["Cobalt"] = ["Buttercup","Bloodred"];

		SecondaryMutations["Hotrod"] = ["Tigerpunk","Henna"];
		SecondaryMutations["Royalblue"] = ["Wolfgrey","Cerulian"];
		SecondaryMutations["Neckbeard"] = ["Dali","Grimace"];
		SecondaryMutations["Autumnmoon"] = ["Twilightsparkle","Palejade"];

		SecondaryMutations["Manx"] = ["Laperm","Persian"];
		SecondaryMutations["Buzzed"] = ["Sass","Sweetmeloncakes"];
		SecondaryMutations["Mertail"] = ["Skyblue","Garnet"];
		SecondaryMutations["Mintmacaron"] = ["Periwinkle","Patrickstarfish"];
		SecondaryMutations["Unicorn"] = ["Flapflap","Daemonhorns"];

		SecondaryMutations["Bornwithit"] = ["Oceanid","Wingtips"];
		SecondaryMutations["Pearl"] = ["Royalblue","Mertail"];
		SecondaryMutations["Sully"] = ["Seafoam","Cobalt"];
		SecondaryMutations["Dioscuri"] = ["Autumnmoon","Oasis"];
		SecondaryMutations["Walrus"] = ["Yokel","Topoftheworld"];
		SecondaryMutations["Inflatablepool"] = ["Peppermint","Universe"];
		SecondaryMutations["Dragontail"] = ["Elk","Littlefoot"];

		SecondaryMutations["Oasis"] = ["Pinefresh","Eclipse"];
		SecondaryMutations["Martian"] = ["Verdigris","Redvelvet"];
		SecondaryMutations["Universe"] = ["Turtleback","Rosequartz"];
		SecondaryMutations["Peppermint"] = ["Ooze","Safetyvest"];

		SecondaryMutations["Inflatablepool"] = ["Peppermint","Universe"];
		SecondaryMutations["Prairierose"] = ["Inflatablepool","Pearl"];

		SecondaryMutations["Topoftheworld"] = ["Samwise","Ruhroh"];
		SecondaryMutations["Scorpius"] = ["Splat","Thunderstruck"];
		SecondaryMutations["Avatar"] = ["Scorpius","Razzledazzle"];
		SecondaryMutations["Frozen"] = ["Juju","Tinybox"];
		SecondaryMutations["Lykoi"] = ["Fox","Kurilian"];
		SecondaryMutations["Fox"] = ["Mekong", "Norwegianforest"];


		TierThreeMutations = {};
		TierThreeMutations["Bornwithit"] = ["Oceanid","Wingtips"];
		TierThreeMutations["Pearl"] = ["Royalblue","Mertail"];
		TierThreeMutations["Sully"] = ["Seafoam","Cobalt"];
		TierThreeMutations["Dioscuri"] = ["Autumnmoon","Oasis"];
		TierThreeMutations["Walrus"] = ["Yokel","Topoftheworld"];
		TierThreeMutations["Inflatablepool"] = ["Peppermint","Universe"];
		TierThreeMutations["Avatar"] = ["Scorpius","Razzledazzle"];
		TierThreeMutations["Shamrock"] = ["Hyacinth","Martian"];
		TierThreeMutations["Lykoi"] = ["Fox","Kurilian"];


		mutationDicts = [];
		mutationDicts.push(PremierMutations);
		mutationDicts.push(SecondaryMutations);
		mutationDicts.push(TierThreeMutations);

		return mutationDicts;
	}

	return self;
}

module.exports = MutationDictionaries;