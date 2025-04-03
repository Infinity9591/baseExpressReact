const express = require('express');
const router = express.Router();
const rolePermissionController = require('../../controllers/RolePermissionController');
const authorize = require('../../middleware/authorization');

router.get('/', rolePermissionController.index);
router.post('/addPermission', rolePermissionController.addPermissions);
router.post('/deletePermission', rolePermissionController.deletePermissions);
// router.get('/' ,accountController.index);

module.exports = router;
