function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

// function getFile(file) {
// 	return ASQ(function(done){
// 		fakeAjax(file,done);
// 	});
// }

function getFile(file) {
	return new Promise((rel) => {
		fakeAjax(file,rel)
	})
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

function resume(p) {
	p.then(output).then(() => run.next());
}

// ???
function *main() {
	const p1 = getFile('file1');
	const p2 = getFile('file2');
	const p3 = getFile('file3');
	yield resume(p1)
	yield resume(p2)
	yield resume(p3)
}


const run = main();

run.next()