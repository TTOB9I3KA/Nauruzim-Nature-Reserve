const { getAdmin } = require("./database/sqlite");

module.exports = function(server) {
	
	server.post('/login/login_request/', (req, res) => {
		if (!req.body) {
			res.sendStatus(502);
		}
		const { email, password, remember } = req.body;
		const admin = getAdmin(email, password);
		if (!admin) {
			res.end();
			return;
		}
		req.session.adminAuthenticated = true;
		res.redirect("/main.html");
	})
}