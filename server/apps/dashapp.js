module.exports = function(server) {
	server.get('/admin/dashboard.*', async (req, res) => {
        if (!req.session.admin) {
            res.sendStatus(401);
            return;
        }
    
        const ext = req.params[0];
        const filePath = path.join(__dirname, '..', 'public', 'login', `dashboard.${ext}`);
        res.sendFile(filePath);
    })
}