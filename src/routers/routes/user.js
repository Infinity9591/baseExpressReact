const express = require('express');
const router = express.Router();
const userController = require('../../controllers/UserController');
const authorize = require('../../middleware/authorization');

router.get('/', authorize('read', 'user'), userController.index);
router.post('/create', authorize('create', 'user'), userController.create);
router.post('/update', authorize('update', 'user'), userController.update);

module.exports = router;
