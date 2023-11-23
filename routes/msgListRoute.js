const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('../middleware/jwt_decode');
const msgListController = require('../controller/msgListController');
router.use(bodyParser.json());

router.get('/:recieverId', auth.authenticate, msgListController.msgListControllerGetRcv);
router.get('/0/:senderId', auth.authenticate, msgListController.msgListControllerGetSnd);

module.exports = router;