const https = require('https');
const axios = require('axios');
var express = require('express');
var app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/weather', function(req, res) {
	  res.send("weather here");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
