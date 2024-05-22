const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const { dbInit } =  require("./database/sqlite.js");
const port = 3000;

const fileExists = (filePath) => {
    return new Promise((resolve) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            resolve(!err);
        });
    });
};

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