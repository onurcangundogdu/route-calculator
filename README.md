This project is a solution for volt-lines assignment.<br />

The project uses Google Maps API to draw a route between origin, destination points including passenger waypoints.<br />

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The project uses json-server to mimic passengers data.<br />
If you like to change the data please update db.json file.

## To succesfully run the project
In the root directory,


### `npm install`
Installs the dependencies.<br />


### add .env.development file
Add .env.development file to the root folder.<br />
Add a key named REACT_APP_GOOGLE_MAPS_API_KEY and assign a valid value.


### `npm run jsonserver`
Runs the mimic backend server for passengers.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.


### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.