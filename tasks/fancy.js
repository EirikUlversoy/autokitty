var gulp = require('gulp');
var process = require('process');
var opt_array = process.argv
console.log(opt_array)
var lulu_100 = 846745
var last_lulu = 899956
var meowstro_100 = 977716
var last_meowstro = 994054
var raspoutine_100 = 831462
var last_raspoutine = 1008981
var pawzilla_100 = 1033051
var last_pawzilla = 1050346
var traitSearcher = require('../trait-search-module/TraitSearchModule')([opt_array
[0],process.cwd(),"trait-search-multiple","lulu",12,99,true,true,lulu_100,26,last_lulu])


// takes in a callback so the engine knows when it'll be done
gulp.task('fancy', function (cb) {
	var task_list = []

	task_list.push([opt_array[0],process.cwd(),"trait-search-multiple","lulu",12,99,true,true,lulu_100,26,last_lulu])

	task_list.push([opt_array[0],process.cwd(),"trait-search-multiple","lulu",11,99,true,true,lulu_100,29,last_lulu])

	task_list.push([opt_array[0],process.cwd(),"trait-search-multiple","lulu",10,99,true,true,lulu_100,38,last_lulu])

	task_list.push([opt_array[0],process.cwd(),"trait-search-multiple","meowstro",11,99,true,true,meowstro_100,56,last_meowstro])

	task_list.push([opt_array[0],process.cwd(),"trait-search-multiple","meowstro",10,99,true,true,meowstro_100,56,last_meowstro])

	task_list.push([opt_array[0],process.cwd(),"trait-search-multiple","meowstro",9,99,true,true,meowstro_100,57,last_meowstro])

	task_list.push([opt_array[0],process.cwd(),"trait-search-multiple","meowstro",8,99,true,true,meowstro_100,60,last_meowstro])

	task_list.push([opt_array[0],process.cwd(),"trait-search-multiple","raspoutine",13,99,true,true,raspoutine_100,29,last_raspoutine])

	task_list.push([opt_array[0],process.cwd(),"trait-search-multiple","raspoutine",12,99,true,true,raspoutine_100,29,last_raspoutine])

	task_list.push([opt_array[0],process.cwd(),"trait-search-multiple","raspoutine",11,99,true,true,raspoutine_100,54,last_raspoutine])

	task_list.push([opt_array[0],process.cwd(),"trait-search-multiple","raspoutine",10,99,true,true,raspoutine_100,45,last_raspoutine])

	//task_list.push([opt_array[0],process.cwd(),"trait-search-multiple","pawzilla",10,true,true,raspoutine_100,45,last_raspoutine])
	for(var task in task_list){
		doStuff(task_list[task])
	}
   	function dostuff(args){
   		var traitSearcher = require('../trait-search-module/TraitSearchModule')(args)
   		traitSearcher.start(args)
   	}
});