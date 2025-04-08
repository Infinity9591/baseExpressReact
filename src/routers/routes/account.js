const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/AccountController');
const authorize = require('../../middlewares/authorization');

router.get('/', authorize('read', 'account'), accountController.index);
router.post(
    '/create',
    authorize('create', 'account'),
    accountController.create,
);
router.post(
    '/deactive',
    authorize('delete', 'account'),
    accountController.deactive,
);
router.post(
    '/active',
    authorize('delete', 'account'),
    accountController.active,
);
router.post(
    '/editRole',
    authorize('update', 'account'),
    accountController.editRole,
);

module.exports = router;
