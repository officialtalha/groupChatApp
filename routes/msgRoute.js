const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const msgController = require('../controller/msgController');
router.use(bodyParser.json());


router.post('/', msgController.msgControllerPost);
router.post('/:forGroup', msgController.msgControllerPostForGroup);

module.exports = router;
