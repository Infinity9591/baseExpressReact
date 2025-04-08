const express = require('express');
const router = express.Router();
const permissionsForRoleController = require('../../controllers/PermissionsForRoleController');
const authorize = require('../../middlewares/authorization');

router.get('/', permissionsForRoleController.index);
router.post('/addPermission', permissionsForRoleController.addPermissions);
router.post(
    '/deletePermission',
    permissionsForRoleController.deletePermissions,
);
// router.get('/' ,accountController.index);

module.exports = router;
