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


app.get("/json", function (req, res) {

	let data = { "message": "Hello json" };

	console.log(process.env.MESSAGE_STYLE);

	if (process.env.MESSAGE_STYLE === 'uppercase') {
		console.log("YES! It is equal to 'uppercase'!");
		data.message = "HELLO JSON";
		console.log(data.message);
	}

	console.log(process.env.MESSAGE_STYLE);

	console.log(data);
	return res.json(data);
});







module.exports = app;
