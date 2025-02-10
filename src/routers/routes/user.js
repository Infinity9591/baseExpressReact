const express = require('express');
const router = express.Router();
const userController = require('../../app/controllers/UserController');
const authorize = require('../../middleware/authorization');

router.get('/', authorize('read', 'user'), userController.index);

module.exports = router;
