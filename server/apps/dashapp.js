const {serverMainDirectory} = require('../server_utilities.js');

module.exports = function(server) {
	server.get('/admin/dashboard.*', async (req, res) => {
        console.log(req.get('Referer'))
        if (!req.session.admin) {
            res.sendStatus(401);
            return;
        }
    
        const ext = req.params[0];
        const filePath = path.join(serverMainDirectory, 'public', 'login', `dashboard.${ext}`);
        res.sendFile(filePath);
    })
}