const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const getAllUsersController = require('../controller/getAllUsersController');
const auth = require('../middleware/jwt_decode');
router.use(bodyParser.json());
router.get('/', auth.authenticate, getAllUsersController.getAllUsersControllerGet);
router.get('/:recieverId', auth.authenticate, getAllUsersController.getAllUsersControllerGetParam);
router.get('/:onlyUserName/:userId', auth.authenticate, getAllUsersController.getAllUsersControllerGetParamOnlyUserName);
router.get('/:one/:two/:mobile', auth.authenticate, getAllUsersController.getAllUsersControllerGetParamByMobile);
router.get('/:one/:two/:three/:name', auth.authenticate, getAllUsersController.getAllUsersControllerGetParamByName);
router.get('/:one/:two/:three/:four/:email', auth.authenticate, getAllUsersController.getAllUsersControllerGetParamByEmail);

module.exports = router;