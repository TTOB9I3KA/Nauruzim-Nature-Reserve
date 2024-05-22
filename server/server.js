// server imports
const express = require('express');
const session = require("express-session")
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// helpers imports
const path = require('path');
const fsp = require('node:fs/promises');

// database imports
const { dbInit } =  require("./database/sqlite.js");
const { serverMainDirectory } = require('./server_utilities.js');

const configPath = path.join(serverMainDirectory, 'server', 'serverConfig.json');
const configureServer = () => {
	const secure = !global.serverConfig.development
	const proxy = !global.serverConfig.development ? 1 : 0;
	const sessionCfg = session({
		secret: global.serverConfig.secret,
		resave: false,
		saveUninitialized: true,
		cookie: {secure: secure}
	})
	// configure session middleware
	app.set('trust proxy', proxy);
	app.use(sessionCfg);

	// setup cors for client-server fetching
	app.use(cors());

	// middleware for parsing http body
	app.use(bodyParser.urlencoded({ extended: false }));
} 

const loadConfig = async () => {
	try {
		const data = await fsp.readFile(configPath, {encoding: 'utf-8'});
		const config = JSON.parse(data);
		global.serverConfig = config;
	}
	catch (err) {
		console.error(err.message);
	}
	const split = configPath.split('\\');
	console.log(`(root): Configration file loaded: ${split[split.length-1]}`)
  };


// load configuration before listening
loadConfig().then(() => {
	// Configure server instance
	configureServer();
	
	// include other handlers
	require('./apps/loginapp.js')(app);
	require('./apps/tourapp.js')(app);
	require('./apps/dbapp.js')(app);
	require('./apps/serverapp.js')(app); // should be the last, because defines "one for everything" handler to handle images

	app.use(express.static(path.join(serverMainDirectory, 'public'))); // connect static middleware after loginapp, so it can catch a route

	app.listen(global.serverConfig.port, () => {
		console.log(`(root): Server is running on http://localhost:${global.serverConfig.port}`);
		dbInit();
	});
});