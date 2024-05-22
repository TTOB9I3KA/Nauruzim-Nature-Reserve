const { addTour } = require("./database/sqlite.js");

module.exports = function(server) {
	
	server.post('/tour/regist', async (req, res) => {
		if (!req.body) {
			res.sendStatus(502);
		}
		console.log(req.body);
		const { name, phone, booking, end } = req.body;
		await addTour(name, phone, booking, end);
		res.redirect("/main.html")
	})
}