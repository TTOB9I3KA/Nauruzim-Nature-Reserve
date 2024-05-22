const { getAdmin } = require("../database/sqlite.js");
const path = require('path');
const {serverMainDirectory} = require('../server_utilities.js');

module.exports = function(server) {
	// custom handler which avoids static files
	server.get('/login/login.html', async (req, res) => {
		if (req.session.admin && req.session.remember) {
			console.log(`Admin logged in as remember me`);
			res.redirect('/admin/dashboard.html');
			return;
		}
		console.log('not admin');
		const filePath = path.join(serverMainDirectory,'public', 'login', 'login.html');
		res.sendFile(filePath);
	}),

	server.post('/login/login_request/', async (req, res) => {
		if (!req.body) {
			res.sendStatus(502);
		}
		const { email, password, remember } = req.body;
		const admin = await getAdmin(email, password);
		if (!admin) {
			res.redirect('/login/login.html');
			return;
		}
		req.session.admin = true;
		console.log(remember);
		req.session.remember = remember === 'on';
		console.log(`Admin logged with account ${admin.email}`);
		res.redirect("/admin/dashboard.html");
	})
}