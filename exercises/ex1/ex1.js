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
// The old-n-busted callback way
const obj = {
	file1: false,
	file2: false,
	file3: false
}

const cordinate = (file, text) => {
	obj[file] = text;
	for(const key in obj) {
		if(!obj[key]) {
			return;
		}
		if(typeof obj[key] === "string") {
			output(obj[key])
			obj[key] = true;
		}
	}
	output('complete!')
}

function getFile(file) {
	fakeAjax(file,function(text){
		// what do we do here?
		cordinate(file,text);
	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
