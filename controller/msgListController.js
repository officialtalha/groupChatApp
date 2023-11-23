const Sequelize = require('sequelize');
const Msg = require('../models/msgModel');
const User = require('../models/userModel');
exports.msgListControllerGetRcv = async (req, res) => {
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
exports.msgListControllerGetSnd = async (req, res) => {
    try {
        const senderId = req.params.senderId;
        const result = await User.findOne({
            attributes: ['name'],
            where: {
                id: senderId
            }
        });
        res.status(200).json({ result: result.name, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};