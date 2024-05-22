module.exports = function(server) {
	server.post('/login/login_request/', (req, res) => {
		if (!req.body) {
			res.sendStatus(502);
		}
		const { email, password, remember } = req.body;

		
		res.redirect("/main.html");
	})
}