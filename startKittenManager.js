
var args = process.argv;
console.log(args);
var config = require('./helpers/config/config');

switch (args[2]) {

	case "mutate-one":
		var { mutateOne } = require('./actions/mutate-one');
		var starter = mutateOne()
		starter.start()
		break;
	case "mutate-all":
		var mutateAll = require('./actions/mutate-all')();
		mutateAll.start();
		break;
	case "load-pairs":
		var loadPairs = require('./actions/load-pairs')();
		loadPairs.start();
		break;
	case "max-mutation-search":
		var maxMutationSearch = require('./actions/max-mutation-search')();
		maxMutationSearch.start();
		break;
	case "buy-clock-cats":
		var buyClockCats = require('./actions/buy-clock-cats')();
		buyClockCats.start();
		break;
	case "make-fancy-cat":
		var makeFancyCat = require('./actions/make-fancy-cat')();
		makeFancyCat.start();
		break;
	case "show-mutations":
		var showMutations = require('./actions/show-mutations')();
		showMutations.start();
		break;
	case "send-cats":
		var sendCats = require('./actions/send-cats')();
		sendCats.start();
		break;
	case "list-auctions":
		var listAuctions = require('./actions/list-auctions')();
		listAuctions.start();
		break;
	case "trait-search":
		var traitSearch = require('./actions/trait-search')();
		traitSearch.start();
		break;
	case "trait-search-multiple":
		var traitSearch = require('./actions/trait-search')();
		traitSearch.start();
		break;
	case "search-auctions":
		var searchAuctions = require('./actions/search-auctions')();
		searchAuctions.start();
		break;
	case "fancy-filtering":
		var fancyFiltering = require('./actions/trait-search')();
		TraitSearchModule.start();
		break;
	case "trait-sorter":
		var TraitSorter = require(__dirname +'helpers/trait-sorter/TraitSorter.js')();
		TraitSorter.start();
		break;
	case "generation-outputter":
		var TraitSorter = require(__dirname +'helpers/trait-sorter/TraitSorter.js')();
		TraitSorter.start();
		break;
	case "make-fancy-catX":
		var makeFancyCatX = require('./actions/make-fancy-cat')();
		makeFancyCatX.start();
		break;
}