const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/RoleController');
const authorize = require('../../middlewares/authorization');

router.get('/', authorize('read', 'roles'), roleController.index);
router.post('/create', authorize('create', 'roles'), roleController.create);
router.post('/update', authorize('update', 'roles'), roleController.update);

module.exports = router;
