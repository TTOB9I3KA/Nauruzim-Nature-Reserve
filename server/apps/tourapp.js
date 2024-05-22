const { addTour, getTourPhone } = require("../database/sqlite.js");

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

module.exports = function(server) {
	
	server.post('/tour/regist', async (req, res) => {
		if (!req.body) {
			res.sendStatus(502);
		}
		const { name, phone, booking, end } = req.body;
		const curDate = new Date();

		const record = await getTourPhone(phone);

		// get referer to return back to sending page
		const referer = req.get('Referer');

		if (record) {
			const record_creationg_date = new Date(record.record_date);
			const within_one_day = Math.abs(curDate - record_creationg_date) <= ONE_DAY_IN_MS;

			if (within_one_day) {
				res.status = 502;
				res.redirect(referer);
				return;
			}
		}
		await addTour(name, phone, booking, end);
		
		if (referer) {
			res.redirect(referer);
			return;
		}
		// fallback path
		res.redirect("/main.html")
	})
}