const express = require('express');
const router = express.Router();
const permissionController = require('../../controllers/PermissionController');
const authorize = require('../../middlewares/authorization');

router.get('/', authorize('read', 'permissions'), permissionController.index);
router.post('/create', authorize('create', 'permissions'), permissionController.create);

module.exports = router;
