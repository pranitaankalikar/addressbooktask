

const express = require('express');

const contactController = require('../controllers/contact');

const router = express.Router();


//router.get('/catgory-with-three-prod/:categoryname', catergoryController.getCategoryWithThreeProd);
router.post('/addcontact', contactController.postaddcontact);
router.get('/getcontact', contactController.getcontact);
router.delete('/deletecontact/:contactid', contactController.deletecontact);
router.post('/search/:letters', contactController.postsearch);



module.exports = router;
