const Sequelize = require('sequelize');
const Msg = require('../models/msgModel');
const User = require('../models/userModel');
exports.msgListControllerGet = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const loggedInUserName = req.user.name;
        let recieverId = req.params.recieverId;

        const result = await Msg.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { senderId: loggedInUserId, receiverId: recieverId },
                    { senderId: recieverId, receiverId: loggedInUserId }
                ]
            },
            order: [['createdAt', 'ASC']]
        });
        res.status(200).json({ result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};
exports.msgListControllerGetForGroup = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const loggedInUserName = req.user.name;
        let groupId = req.params.groupId;

        const result = await Msg.findAll({
            where: {
                groupId
            },
            order: [['createdAt', 'ASC']]
        });
        res.status(200).json({ result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};