const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const adminController = require('../controller/adminController');
const auth = require('../middleware/jwt_decode');
router.use(bodyParser.json());

router.post('/', adminController.adminControllerPost);
router.get('/:groupId', auth.authenticate, adminController.adminControllerGet);

module.exports = router;