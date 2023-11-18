const express = require('express');
const bodyParser = require('body-parser');
const signUpController = require('../controller/signUpController');
const router = express.Router();

router.use(bodyParser.json());

router.post('/', signUpController.signUpPost);

module.exports = router;