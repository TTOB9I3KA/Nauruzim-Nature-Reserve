const path = require('path');
const fs = require('fs');
const { serverMainDirectory } = require('../server_utilities.js')

const restrictedFolders = ['server', 'node_modules', '.gitignore', 'package-lock.json', 'package.json'];

module.exports = function (server) {
    const fileExists = (filePath) => {
        return new Promise((resolve) => {
            fs.access(filePath, fs.constants.F_OK, (err) => {
                resolve(!err);
            });
        });
    };
    // pass config to client, so it can make requests to our server
    // we can also pass some other data to client
    server.get('/config.json', async (req, res) => {
        if (!req.session.admin) {
            res.sendStatus(401);
            return;
        }
        // set status code to ok, because client awaits for it
        res.status = 200;
        const filePath = path.join(serverMainDirectory, 'server', 'clientConfig.json');
        res.sendFile(filePath);
    })

    server.get('/admin/dashboard.*', async (req, res) => {
        if (!req.session.admin) {
            res.sendStatus(401);
            return;
        }

        const ext = req.params[0];
        const filePath = path.join(serverMainDirectory, 'public', 'login', `dashboard.${ext}`);
        res.sendFile(filePath);
    })

    // Wildcard route to serve image files from 'public', 'card', and 'icon' directories
    server.get('/*', async (req, res) => {
        const requestedPath = req.params[0];
        const pathSegments = requestedPath.split('/');

        // Check if any of the path segments match a restricted folder
        if (pathSegments.some(segment => restrictedFolders.includes(segment))) {
            console.log('Access to restricted folder refused');
            return res.status(403).send('Access to restricted folder refused');
        }

        const filePaths = [
            path.join(serverMainDirectory, 'public', requestedPath),
            path.join(serverMainDirectory, requestedPath),
        ];

        for (const filePath of filePaths) {
            if (await fileExists(filePath)) {
                console.log(`${filePath}`);
                return res.sendFile(filePath);
            }
        }
        res.sendStatus(404);
    });

    server.get('/', async (req, res) => {
        res.redirect('/main.html');
    })
}