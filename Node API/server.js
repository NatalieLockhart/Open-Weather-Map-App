const apicache = require('apicache');
const ForecastController = require('./controllers/forecastController.js');
var cors = require('cors');
var express = require('express');
var app = express();            
const port = 3000;
var cache = apicache.middleware;

var fcController = new ForecastController();

app.use(cors());
app.use(cache('3 hours'));

app.get('/will-be-cached', (req, res) => {
  res.json({ success: true })
})

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/weather/zipCode/:zipCode', function(req, res) {	
	fcController.weatherGetFromZip(res, req.params.zipCode).then(data => {
		res.send(data);
	})
});

app.get('/weather/city/:city', function(req, res){
	fcController.weatherGetFromCity(res,req.params.city).then(data => {
		res.send(data);
	})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


