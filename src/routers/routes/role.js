const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/RoleController');
const authorize = require('../../middlewares/authorization');

router.get('/', authorize('read', 'role'), roleController.index);
router.post('/create', authorize('create', 'role'), roleController.create);
router.post('/update', authorize('update', 'role'), roleController.update);

module.exports = router;
