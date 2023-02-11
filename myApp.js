const dotenv = require('dotenv');
dotenv.config();

let express = require('express');
let app = express();

console.log("Hello World");

app.use('/public', express.static(__dirname + '/public'));
console.log("path to public static assets:", __dirname + '/public');

app.get("/", function (req, res) {
	//res.send("Hello Express");
	res.sendFile(__dirname + '/views/index.html');
	console.log("variable __dirname is:", __dirname);
	console.log("path to view in HTML:", __dirname + '/views/index.html');
});

// > The endpoint `/json` should serve the JSON object `{"message": "Hello json"}`
// or `{"message": "HELLO JSON"}`.
app.get("/json", function (req, res) {

	let data = { "message": "Hello json" };
	/*
	Note that you must read the value of process.env.MESSAGE_STYLE inside
	the route handler, not outside of it, due to the way our tests run:
	*/
	const mySecret = process.env['MESSAGE_STYLE'];

	console.log(mySecret);

	if (mySecret === 'uppercase') {
		console.log("YES! It is equal to 'uppercase'!");
		data.message = "HELLO JSON";
		console.log(data.message);
	}

	console.log(mySecret);

	console.log(data);
	return res.json(data);
});

module.exports = app;
