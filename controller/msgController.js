const Sequelize = require('sequelize');
const Msg = require('../models/msgModel');
const User = require('../models/userModel');
const Grp = require('../models/groupModel');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const logger = require('../middleware/logger');
const { messageEmit, groupMessageEmit } = require('../socket/socket');

exports.msgControllerPost = async (req, res) => {
    try {
        const { message, token, recieverId } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SecretKey);
        const senderId = decoded.id;
        //getting current time 
        // let a = moment();
        // let b = a.toString();
        // const arr = b.split(' ');
        const time = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(time);
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
                id: recieverId
            }
        });

        //checking whether message contains a text or image formData


        //creating entry in the Message model 
        const result = await Msg.create({
            senderId: senderId,
            senderName: senderName.name,
            receiverId: recieverId,
            receiverName: receiverName.name,
            messageContent: message,
            timeStamp: time
        });
        messageEmit(result);
        res.status(200).json({ result, success: true });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: err, success: false });
    }
};
exports.msgControllerPostForGroup = async (req, res) => {
    try {

        const { message, token, groupId } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SecretKey);
        const senderId = decoded.id;

        //getting current time 
        // let a = moment();
        // let b = a.toString();
        // const arr = b.split(' ');
        const time = moment().format('YYYY-MM-DD HH:mm:ss');

        //getting sender name from user model
        const senderName = await User.findOne({
            attrbutes: ['name'],
            where: {
                id: senderId
            }
        });

        //creating entry in the Message model 
        const result = await Msg.create({
            senderId: senderId,
            senderName: senderName.name,
            messageContent: message,
            timeStamp: time,
            groupId
        });
        groupMessageEmit(result);
        res.status(200).json({ result, success: true });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: err, success: false });
    }
};