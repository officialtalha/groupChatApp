const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const groupController = require('../controller/groupController');
const auth = require('../middleware/jwt_decode');
router.use(bodyParser.json());

router.post('/', groupController.groupControllerPost);
router.get('/', auth.authenticate, groupController.groupControllerGet);
router.get('/:groupId', groupController.groupControllerGetParam);

module.exports = router;