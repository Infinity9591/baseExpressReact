const express = require('express');
const router = express.Router();
const siteController = require('../../controllers/SiteControllers');

router.post('/login', siteController.login);
router.get('/getPersonalInformation', siteController.getPersonalInformation);
router.post(
    '/updatePersonalInformation',
    siteController.updatePersonalInformation,
);
router.post('/changePassword', siteController.changePassword);
router.get('/getSourceName', siteController.getSourceName);

module.exports = router;
