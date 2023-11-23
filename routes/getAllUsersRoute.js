const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const getAllUsersController = require('../controller/getAllUsersController');
const auth = require('../middleware/jwt_decode');
router.use(bodyParser.json());
router.get('/', auth.authenticate, getAllUsersController.getAllUsersControllerGet);

module.exports = router;