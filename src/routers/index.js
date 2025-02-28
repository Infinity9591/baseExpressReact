const siteRouter = require('./routes/site');
const accountRouter = require('./routes/account');
const userRouter = require('./routes/user');
const rolePermissionRouter = require('./routes/rolePermission');
const roleRouter = require('./routes/role');
const permissionRouter = require('./routes/permission');

const express = require('express');
const router = express.Router();

router.use('/site', siteRouter);
router.use('/account', accountRouter);
router.use('/user', userRouter);
router.use('/rolePermission', rolePermissionRouter);
router.use('/role', roleRouter);
router.use('/permission', permissionRouter);

module.exports = router;
