const aws = require('aws-sdk');
const jwt = require('jsonwebtoken');
const Msg = require('../models/msgModel');
const logger = require('../middleware/logger');
const User = require('../models/userModel');
const moment = require('moment');
const { messageEmitImg, messageEmitImgGroup } = require('../socket/socket');
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
exports.imgControllerPost = async (req, res) => {
    try {
        const token = req.params.token;
        const receiverId = req.params.recieverId;
        const decoded = jwt.verify(token, process.env.JWT_SecretKey);
        const senderId = decoded.id;

        //getting current time 
        let a = moment();
        let b = a.toString();
        const arr = b.split(' ');
        const time = arr[4];

        //getting sender and receiver name from user model
        const senderName = await User.findOne({
            attrbutes: ['name'],
            where: {
                id: senderId
            }
        });
        const receiverName = await User.findOne({
            attrbutes: ['name'],
            where: {
                id: receiverId
            }
        });

        const params = {
            Bucket: 'multimedia-chat',
            Key: `${new Date()}${req.file.originalname}`,
            Body: req.file.buffer,
            ACL: 'public-read'
        };
        let result;
        s3.upload(params, async (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error uploading file');
            }
            result = await Msg.create({
                senderId: senderId,
                senderName: senderName.name,
                receiverId: receiverId,
                receiverName: receiverName.name,
                messageContent: data.Location,
                timeStamp: time
            });
            //socket
            messageEmitImg(result);
        });

        res.status(200).json({ result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};

exports.imgControllerPostForGroup = async (req, res) => {
    try {
        const token = req.params.token;
        const groupId = req.params.groupId;
        const decoded = jwt.verify(token, process.env.JWT_SecretKey);
        const senderId = decoded.id;

        //getting current time 
        let a = moment();
        let b = a.toString();
        const arr = b.split(' ');
        const time = arr[4];

        //getting sender and receiver name from user model
        const senderName = await User.findOne({
            attrbutes: ['name'],
            where: {
                id: senderId
            }
        });

        const params = {
            Bucket: 'multimedia-chat',
            Key: `${new Date()}${req.file.originalname}`,
            Body: req.file.buffer,
            ACL: 'public-read'
        };
        let result;
        s3.upload(params, async (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error uploading file');
            }
            result = await Msg.create({
                senderId: senderId,
                senderName: senderName.name,
                messageContent: data.Location,
                timeStamp: time,
                groupId
            });
            messageEmitImgGroup(result);
        });
        res.status(200).json({ result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};

