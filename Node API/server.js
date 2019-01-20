const apicache = require('apicache');
const ForecastController = require('./controllers/forecastController.js');
const Forecast = require('./models/forecast.js');
var cors = require('cors');
var express = require('express');
var app = express();            
const port = 3000;
var cache = apicache.middleware;

var fcController = new ForecastController();

//activate cors so that the locally-hosted angular app can access the locally-hosted node API
app.use(cors());
app.use(cache('3 hours'));

app.get('/will-be-cached', (req, res) => {
  res.json({ success: true })
})

app.get('/', (req, res) => res.send('Hello World!'));

//route for calling the weather forecast using a zip code paramter
app.get('/weather/zipCode/:zipCode', function(req, res) {
	if(!fcController.isValidZip(req.params.zipCode)){
		res.send(new Forecast('', [], [], []));
	}
	fcController.weatherGetFromZip(res, req.params.zipCode).then(data => {
		res.send(data);
	})
});

//route for calling the weather forecast using a city paramter
app.get('/weather/city/:city', function(req, res){
	if(!fcController.isValidCity(req.params.city)){
		res.send(new Forecast('', [], [], []));
	}
	fcController.weatherGetFromCity(res,req.params.city).then(data => {
		res.send(data);
	})
});

app.listen(port, () => console.log(`Node API is listening on port ${port}!`))


