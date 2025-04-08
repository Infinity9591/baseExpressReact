const express = require('express');
const router = express.Router();
const permissionController = require('../../controllers/PermissionController');
const authorize = require('../../middlewares/authorization');

router.get('/', permissionController.index);
router.post('/create', permissionController.create);

module.exports = router;
