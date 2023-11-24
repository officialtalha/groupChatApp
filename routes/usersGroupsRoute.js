const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const usersGroupsController = require('../controller/usersGroupsController');
router.use(bodyParser.json());

router.post('/', usersGroupsController.usersGroupsControllerPost);

module.exports = router;