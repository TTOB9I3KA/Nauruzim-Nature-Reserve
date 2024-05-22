const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
			console.error('(db): Could not connect to database', err);
	} else {
			console.log('(db): Connected to sqlite database');
	}
});

const dbInit = () => {
	createAdminsTable();
	createToursTable();
};

const createToursTable = () => {
	db.run(`
		CREATE TABLE IF NOT EXISTS tours (
    	id INTEGER PRIMARY KEY AUTOINCREMENT,
    	name TEXT NOT NULL,
    	phone TEXT NOT NULL,
    	booking_date TEXT NOT NULL,
    	end_date TEXT NOT NULL,
			record_date TEXT NOT NULL
		);
	`);
};

const createAdminsTable = () => {
	db.run(`
			CREATE TABLE IF NOT EXISTS admins (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					email TEXT NOT NULL UNIQUE,
					password TEXT NOT NULL
			)
	`);
};

const addTour = async (name, phone, booking_date, end_date) => {
	const sql = 'INSERT INTO tours (name, phone, booking_date, end_date, record_date) VALUES (?, ?, ?, ?, ?)';
	const values = [name, phone, booking_date, end_date, new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })];

	db.run(sql, values, (err) => {
			if (err) {
					console.error('(db): Error inserting tour record:', err.message);
					return;
			}

			console.log(`(db): Inserted ${name}:${phone} tour record to db`);
	});
}

const rmTourId = async(id) => {
	const sql = 'DELETE FROM tours WHERE id = ?';
	const values = [id];

	db.run(sql, values, (err) => {
		if (err) {
			console.error(`(db): Error deleting tour record: ${err.message}`);
			return;
		}
		console.log(`(db): Deleted tour record with id: ${id}`);
	});
}

const rmTourByPhone = async(phone) => {
	const sql = 'DELETE FROM tours WHERE phone = ?';
	const values = [phone];

	db.run(sql, values, (err) => {
		if (err) {
			console.error(`(db): Error deleting tour record: ${err.message}`);
			return;
		}
		console.log(`(db): Deleted all tour records with phone: ${phone}`);
	});
}

const addAdmin = async(email, password) => {
	const sql = 'INSERT INTO admins (email, password) VALUES (?, ?)';
	const values = [email, password];

	db.run(sql, values, (err) => {
		if (err) {
			console.error(`(db): Failed to insert admin record: ${err.message}`);
			return;
		}
		console.log(`(db): Inserted admin record.`);
	})
}
const rmAdmin = async (id) => {
	const sql = `DELETE FROM admin WHERE id = ?`;
	const values = [id];

	db.run(sql, values, (err) => {
		if (err) {
			console.error(`(db): Failed to delete admin record ${err.message}`);
			return;
		}
		console.log(`(db): Deleted admin record with id: ${id}`);
	})
}
const getAdmin = async (email, password) => new Promise((resolve, reject) => {
	const sql = 'SELECT * FROM admins WHERE email = ? AND password = ?';
	const values = [email, password];

	db.get(sql, values, (err, row) => {
		if (err) {
			reject(new Error(err.message));
			return;
		}
		resolve(row);
	})
})

const getTourId = async (id) => new Promise((resolve, reject) => {
	const sql = `SELECT * FROM tours WHERE id = ?`;
	const values = [id];

	db.get(sql, values, (err, row) => {
		if (err) {
			reject(new Error(err.message));
			return;
		}

		resolve(row);
	})
})

const getTourPhone = async (phone) => new Promise((resolve, reject) => {
	const sql = `SELECT * FROM tours WHERE phone = ?`;
	const values = [phone];

	db.get(sql, values, (err, row) => {
		if (err) {
			reject(new Error(err.message));
			return;
		}
		resolve(row);
	})
})

const getAllTours = async () => new Promise((resolve, reject) => {
	const sql = `SELECT * FROM tours;`;

	db.all(sql, (err, rows) => {
		if (err) {
			reject(new Error(err.message));
			return;
		}

		resolve(rows);
	})
})


module.exports = {
	dbInit, 
	addTour, 
	getTourId, 
	getTourPhone, 
	getAdmin, 
	addAdmin, 
	rmAdmin, 
	rmTourId, 
	rmTourByPhone,
	getAllTours
};