const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const groupController = require('../controller/groupController');

router.use(bodyParser.json());

router.post('/', groupController.groupControllerPost);

module.exports = router;