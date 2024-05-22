const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const session = require("express-session")
const { dbInit, getAllTours, rmTourId } =  require("./database/sqlite.js");
const port = 3000;

const fileExists = (filePath) => {
    return new Promise((resolve) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            resolve(!err);
        });
    });
};
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


require('./login.js')(app);
require('./tourRegist.js')(app);

app.post('/database', async (req, res) => {
	if (!req.session.admin) {
		console.log('UNatew')
		res.sendStatus(401);
		return;
	}
	try {
		console.log('Did')
		const id = req.query.deleteTour;
		if (!id) {
			res.sendStatus(404);
			return;
		}
		console.log(id);
		await rmTourId(id);
		res.sendStatus(200);
	}
	catch (err) {
		console.error(err.message);
		res.status = 500
		res.send('Internal server error');
		return;
	}
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

app.get("/database/records", async (req, res) => {
	if (!req.session.admin) {
		res.sendStatus(401);
		return;
	}
	const rows = await getAllTours();
	res.write(JSON.stringify({
		rows: rows
	}));
	res.status = 200;
	res.end();
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

    res.status(404).send('File not found');
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
		dbInit();
});