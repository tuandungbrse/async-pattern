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

	let text, fn;
	// what do we do here?
	fakeAjax(file, res => {
		if(fn) {
			fn(res)
		} else {
			text = res;
		}
	})

	return cb => {
		if(text) {
			cb(text)
		} else {
			 fn = cb;
		}
	}

}

// request all files at once in "parallel"
// ???
const thunk1 = getFile('file1');
const thunk2 = getFile('file2');
const thunk3 = getFile('file3');

thunk1(data => {
	console.log(data);
	thunk2(data2 => {
		console.log(data2);
		thunk3(data3 => {
			console.log(data3);
			output('complete');
		})
	})
})