This repo contains two applications: a Node API and an Angular app. The Node API calls the OpenWeatherMap api to receive forecasts,
and has endpoints to serve that data to other apps. The Angular app takes parameters from the user, uses them to call the Node API,
and then displays the data back to the user. 

PREREQUISITES:
Node.js version 10.13.0 or higher. Download here: https://nodejs.org/en/download/
NPM version 6.4.1 or higher. Download here: https://www.npmjs.com/get-npm
Angular CLI version 7.2.1 or higher. Download here: https://cli.angular.io/

TO START THE NODE APP:
Open an admin command prompt and navigate to the the "Node API" folder. Once in this folder, run the command "npm install". 
Once the NPM packages finish downloading, run "node server". The server should be listening on port 3000. 
To shut down the server, press ctrl+c twice.

TO START THE ANGULAR APP:
Open an admin commdn prompt and navigate to the "Angular-App" folder. Once in this folder, run the command "npm install".
Once the NPM packages finish downloading, run "ng server". The app should be listening on port 4200.
To shut down the app, press ctrl+c twice.

Once both apps are running, you will be able to input either a US zip code or US city, click the submit button, and receive basic weather information about the area you submitted.
