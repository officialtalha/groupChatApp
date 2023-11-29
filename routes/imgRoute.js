const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
const multer = require('multer');
const imgController = require('../controller/imgController');
// router.use(bodyParser.json());

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limit file size to 5MB
    },
});

router.post('/:token/:recieverId', upload.single('image'), imgController.imgControllerPost);
router.post('/:forGroup/:token/:groupId', upload.single('image'), imgController.imgControllerPostForGroup);


module.exports = router;
