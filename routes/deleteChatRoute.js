const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const deleteChatController = require('../controller/deleteChatController');
const auth = require('../middleware/jwt_decode');
router.use(bodyParser.json());
router.delete('/', auth.authenticate, deleteChatController.deleteChatControllerDelete);

module.exports = router;