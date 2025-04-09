const express = require('express');
const router = express.Router();
const siteController = require('../../controllers/SiteControllers');

router.post('/login', siteController.login);
router.get('/getPersonalInformation', siteController.getPersonalInformation);
router.patch(
    '/updatePersonalInformation',
    siteController.updatePersonalInformation,
);
router.patch('/changePassword', siteController.changePassword);
router.get('/getSourceName', siteController.getSourceName);

module.exports = router;
