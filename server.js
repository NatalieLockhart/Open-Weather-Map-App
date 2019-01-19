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


var apiKey = '7bf5d1bb8a756b8177afbb2ee2e3be3e';
var zipCode = '80223';

//todo: switch to xml
axios.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${apiKey}`)
  .then(response => {
	console.log(response.data.list[0].main.temp);
  })
  .catch(error => {
    console.log(error);
  });