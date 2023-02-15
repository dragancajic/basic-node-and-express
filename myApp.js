const dotenv = require('dotenv');
dotenv.config();

let express = require('express');
let app = express();

console.log("Hello World");

app.use('/', function (req, res, next) {
	console.log(req.method, req.path, '-', req.ip);
	next();
});

app.get('/now', function (req, res, next) {
	req.time = new Date().toString();
	next();
}, function (req, res) {
	let data = { time: req.time };
	console.log("log data from '/now' endpoint:", data);
	return res.json(data);
});

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

	console.log("1st log from '/json' endpoint:", mySecret);

	if (mySecret === 'uppercase') {
		console.log("YES! It is equal to 'uppercase'!");
		data.message = "HELLO JSON";
		console.log(data.message);
	}

	console.log("2nd log from '/json' enpoint:", mySecret);

	console.log("log data from '/json' endpoint:", data);
	return res.json(data);
});

module.exports = app;
