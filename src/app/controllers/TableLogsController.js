const { TableLogs } = require('../models/tableLogs');
require('dotenv').config();

class TableLogsController {
    getTableLogs(req, res) {
        try {
            TableLogs.findAll().then((tableLog) => {
                res.status(200).json(tableLog);
            });
        } catch (e) {
            return res.status(500).send('error');
        }
    }
}

module.exports = new TableLogsController();
