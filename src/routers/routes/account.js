const express = require('express');
const router = express.Router();
const accountController = require('../../app/controllers/AccountController');
const authorize = require('../../middleware/authorization');

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
// router.get('/' ,accountController.index);

module.exports = router;
