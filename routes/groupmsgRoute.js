const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const groupmsgController = require('../controller/groupmsgController');
const auth = require('../middleware/jwt_decode');

router.use(bodyParser.json());

router.post('/', auth.authenticate, groupmsgController.groupmsgControllerPost);
router.get('/:groupId', auth.authenticate, groupmsgController.groupmsgControllerGet);

module.exports = router;