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

function getFile(file) {
	// what do we do here?
	return new Promise((res) => fakeAjax(file,res))
}

// request all files at once in "parallel"
// ???
const promise1 = getFile('file1');
const promise2 = getFile('file2');
const promise3 = getFile('file3');

promise1
	.then(output)
	.then(() => promise2)
	.then(output)
	.then(() => promise3)
	.then(output)
	.then(() => output('Complete!'))