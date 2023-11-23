const GrpMsg = require('../models/groupmsgModel');
const moment = require('moment');
exports.groupmsgControllerPost = async (req, res) => {
    try {
        const { message, token, groupId } = req.body;
        const senderId = req.user.id;
        const senderName = req.user.name;
        let a = moment();
        let b = a.toString();
        const arr = b.split(' ');
        const time = arr[4];
        await GrpMsg.create({
            GroupId: groupId,
            senderId,
            senderName,
            msgContent: message,
            timeStamp: time
        });
        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, success: false });
    }
};

exports.groupmsgControllerGet = async (req, res) => {
    try {
        const senderId = req.user.id;
        const senderName = req.user.name;
        const groupId = req.params.groupId;

        const result = await GrpMsg.findAll({
            where: {
                GroupId: groupId
            },
            order: [['createdAt', 'ASC']]
        });
        res.status(200).json({ result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, success: false });
    }
};