const { addTour, getTourPhone } = require("../database/sqlite.js");
const {loadWord} = require('../server_utilities.js');
const {Readable} = require('stream');

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
		
		// send docx file with ticket
		const newRecord = await getTourPhone(phone);
		const content = await loadWord(newRecord.id, name, phone, booking, end, newRecord.record_date);
		const stream = new Readable({
			read() {
				this.push(content);
				this.push(null);
			}
		});
		res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Disposition': `attachment; filename="ticket${newRecord.id}.docx"`,
            'Content-Length': content.length
        });
        stream.pipe(res);
	})
}