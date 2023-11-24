const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const getAllUsersController = require('../controller/getAllUsersController');
const auth = require('../middleware/jwt_decode');
router.use(bodyParser.json());
router.get('/', auth.authenticate, getAllUsersController.getAllUsersControllerGet);
router.get('/:recieverId', auth.authenticate, getAllUsersController.getAllUsersControllerGetParam);
// router.get('/:allUsersfromThisGroupRoute/:allUsersfromThisGroup', getAllUsersController.getAllUsersControllerGetParamOnlyUsersMatchedInGroupModel);

module.exports = router;