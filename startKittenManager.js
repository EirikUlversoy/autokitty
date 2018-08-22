
var args = process.argv;
console.log(args);
var config = require('./config-module');

switch (args[2]) {

	case "one-mutation":
		var SimpleMutationModule = require('simple-mutation-module')();
		SimpleMutationModule.start();
		break;
	case "all-mutations":
		var SimpleMutationModule = require('simple-mutation-module')();
		SimpleMutationModule.start();
		break;
	case "load-pairs":
		var SimpleMutationModule = require('simple-mutation-module')();
		SimpleMutationModule.start();
	case "pure-mutation":
		var PureMutationModule = require('pure-mutation-module')();
		PureMutationModule.start();
		break;
	case "buy-clock-cats":
		var BuyClockCatsModule = require('buy-clock-cats-module')();
		BuyClockCatsModule.start();
		break;
	case "make-fancy-cat":
		var MakeFancyCatModule = require('make-fancy-cat-module')();
		MakeFancyCatModule.start();
		break;
	case "show-available-mutations":
		var ShowAvailableMutationsModule = require('show-available-mutations-module')();
		ShowAvailableMutationsModule.start();
		break;
	case "send-cats":
		var SendCatsModule = require('send-cats-module')();
		SendCatsModule.start();
		break;
	case "list-auctions":
		var ListAuctionsModule = require('list-auctions-module')();
		ListAuctionsModule.start();
		break;
	case "trait-search":
		var TraitSearchModule = require('trait-search-module')();
		TraitSearchModule.start();
		break;
	case "trait-search-multiple":
		var TraitSearchModule = require('trait-search-module')();
		TraitSearchModule.start();

}