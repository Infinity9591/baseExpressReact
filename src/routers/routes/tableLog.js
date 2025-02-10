const express = require('express');
const router = express.Router();
const tableLogsController = require('../../app/controllers/TableLogsController');

router.get('/getTableLogs', tableLogsController.getTableLogs);

module.exports = router;
