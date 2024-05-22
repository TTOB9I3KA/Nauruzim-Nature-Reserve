const { getAdmin } = require("../database/sqlite.js");

module.exports = function(server) {
	
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
		console.log(`Admin logged with account ${admin.email}`);
		res.redirect("/admin/dashboard.html");
	})
}