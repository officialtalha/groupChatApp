const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('../middleware/jwt_decode');
const msgListController = require('../controller/msgListController');
router.use(bodyParser.json());

router.get('/:recieverId', auth.authenticate, msgListController.msgListControllerGet);
router.get('/:forGroup/:groupId', auth.authenticate, msgListController.msgListControllerGetForGroup);

module.exports = router;