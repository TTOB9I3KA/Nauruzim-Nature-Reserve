const express = require('express');
const path = require('path');
const fs = require('fs');
const fsp = require('node:fs/promises');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const session = require("express-session")
const { dbInit, getAllTours, rmTourId } =  require("./database/sqlite.js");

const port = 3000;
const configPath = path.join(__dirname, 'serverConfig.json');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));
//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'adminSecret',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}))

const fileExists = (filePath) => {
    return new Promise((resolve) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            resolve(!err);
        });
    });
};

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

// include other handlers
require('./apps/loginapp.js')(app);
require('./apps/tourapp.js')(app);
require('./apps/dbapp.js')(app);

// pass config to client, so it can make requests to our server
// we can also pass some other data to client
app.get('/config.json', async (req, res) => {
	if (!req.session.admin) {
		res.sendStatus(401);
		return;
	}
	// set status code to ok, because client awaits for it
	res.status = 200;
	const filePath = path.join(__dirname, 'clientConfig.json');
	res.sendFile(filePath);
})

app.get('/admin/dashboard.*', async (req, res) => {
	if (!req.session.admin) {
		res.sendStatus(401);
		return;
	}

	const ext = req.params[0];
	const filePath = path.join(__dirname, '..', 'public', 'login', `dashboard.${ext}`);
	res.sendFile(filePath);
})

// Wildcard route to serve image files from 'public', 'card', and 'icon' directories
app.get('/*', async (req, res) => {
    const requestedPath = req.params[0];
    const filePaths = [
        path.join(__dirname,'..','public', requestedPath),
        path.join(__dirname, '..', requestedPath),
    ];

    for (const filePath of filePaths) {
        if (await fileExists(filePath)) {
            return res.sendFile(filePath);
        }
    }

    res.status(404).send('(root): File not found');
});

// load configuration before listening
loadConfig().then(() => {
	// Start the server
	app.listen(global.serverConfig.port, () => {
		console.log(`(root): Server is running on http://localhost:${global.serverConfig.port}`);
		dbInit();
	});
});