const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/AccountController');
const authorize = require('../../middlewares/authorization');

router.get('/', authorize('read', 'accounts'), accountController.index);
router.post(
    '/create',
    authorize('create', 'accounts'),
    accountController.create,
);
router.patch(
    '/deactive',
    authorize('delete', 'accounts'),
    accountController.deactive,
);
router.patch(
    '/active',
    authorize('delete', 'accounts'),
    accountController.active,
);
router.patch(
    '/editRole',
    authorize('update', 'accounts'),
    accountController.editRole,
);
router.patch(
	"/editInformation",
	authorize('update', 'accounts'),
	accountController.editInformation
)

module.exports = router;
