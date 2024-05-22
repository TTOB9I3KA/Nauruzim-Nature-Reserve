module.exports = function(server) {
	
	server.get("/database/records", async (req, res) => {
        if (!req.session.admin) {
            res.sendStatus(401);
            return;
        }
        const rows = await getAllTours();
        res.write(JSON.stringify({
            rows: rows
        }));
        res.status = 200;
        res.end();
    }),
    server.post('/database', async (req, res) => {
        if (!req.session.admin) {
            res.sendStatus(401);
            return;
        }
        try {
            const id = req.query.deleteTour;
            if (!id) {
                res.sendStatus(404);
                return;
            }
            console.log(id);
            await rmTourId(id);
            res.sendStatus(200);
        }
        catch (err) {
            console.error(err.message);
            res.status = 500
            res.send('Internal server error');
            return;
        }
    })
}