const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const deletegroupController = require('../controller/deletegroupController');
const auth = require('../middleware/jwt_decode');

router.use(bodyParser.json());

router.delete('/:groupId', deletegroupController.deletegroupControllerDelete);

module.exports = router;