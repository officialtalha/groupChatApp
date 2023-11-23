const Sequelize = require('sequelize');
const Msg = require('../models/msgModel');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
exports.msgControllerPost = async (req, res) => {
    try {

        const { message, token, recieverId } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SecretKey);
        const senderId = decoded.id;
        //getting sender and receiver name 
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
        //creating entry in the db 
        const result = await Msg.create({
            senderId: senderId,
            senderName: senderName.name,
            receiverId: recieverId,
            receiverName: receiverName.name,
            messageContent: message
        });

        res.status(200).json({ message: result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};