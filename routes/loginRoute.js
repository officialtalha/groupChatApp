const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const loginController = require('../controller/loginController');

router.use(bodyParser.json());

router.post('/', loginController.loginControllerPost);

module.exports = router;