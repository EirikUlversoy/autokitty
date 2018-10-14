
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
		var { mutateAll } = require('./actions/mutate-all');
		var starter = mutateAll()
		starter.start()
		break;
	case "load-pairs":
		var { loadPairs } = require('./actions/load-pairs');
		var starter = loadPairs()
		starter.start()
		break;
	case "max-mutation-search":
		var { maxMutationSearch } = require('./actions/max-mutation-search');
		var starter = maxMutationSearch()
		starter.start()
		break;
	case "buy-clock-cats":
		var { buyClockCats } = require('./actions/buy-clock-cats');
		var starter = buyClockCats()
		starter.start()
		break;
	case "make-fancy-cat":
		var { makeFancyCat } = require('./actions/make-fancy-cat');
		var starter = makeFancyCat()
		starter.start()
		break;
	case "show-mutations":
		var { showMutations } = require('./actions/show-mutations');
		var starter = showMutations()
		starter.start()
		break;
	case "send-cats":
		var { sendCats } = require('./actions/send-cats');
		var starter = sendCats()
		starter.start()
		break;
	case "list-auctions":
		var { listAuctions } = require('./actions/list-auctions');
		var starter = listAuctions()
		starter.start()
		break;
	case "trait-search":
		var { traitSearch } = require('./actions/trait-search');
		var starter = traitSearch()
		starter.start()
		break;
	case "trait-search-multiple":
		var { traitSearch } = require('./actions/trait-search');
		var starter = traitSearch()
		starter.start()
		break;
	case "search-auctions":
		var { searchAuctions } = require('./actions/search-auctions');
		var starter = searchAuctions()
		starter.start()
		break;
	case "fancy-filtering":
		var { traitSearch } = require('./actions/trait-search');
		var starter = traitSearch()
		starter.start()
		break;
	case "trait-sorter":
		var TraitSorter = require('./helpers/trait-sorter/TraitSorter.js')();
		TraitSorter.start()
		break;
	case "generation-outputter":
		var TraitSorter = require('./helpers/trait-sorter/TraitSorter.js')();
		TraitSorter.start()
		break;
	case "make-fancy-catX":
		var { makeFancyCat } = require('./actions/make-fancy-cat');
		var starter = makeFancyCat()
		starter.start()
		break;
}