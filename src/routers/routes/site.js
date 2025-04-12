const express = require('express');
const router = express.Router();
const siteController = require('../../controllers/SiteControllers');

router.post('/login', siteController.login);
router.get('/getPersonalData', siteController.getPersonalData);
router.patch(
    '/updatePersonalData',
    siteController.updatePersonalData,
);
router.patch('/changePassword', siteController.changePassword);
router.get('/getSourceName', siteController.getSourceName);

module.exports = router;
