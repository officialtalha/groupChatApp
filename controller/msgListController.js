const Sequelize = require('sequelize');
const Msg = require('../models/msgModel');
const logger = require('../middleware/logger');
exports.msgListControllerGet = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        let recieverId = req.params.recieverId;

        const result = await Msg.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { senderId: loggedInUserId, receiverId: recieverId },
                    { senderId: recieverId, receiverId: loggedInUserId }
                ]
            },
            order: [['timeStamp', 'ASC']]
        });
        res.status(200).json({ result, success: true });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: err, success: false });
    }
};
exports.msgListControllerGetForGroup = async (req, res) => {
    try {
        let groupId = req.params.groupId;

        const result = await Msg.findAll({
            where: {
                groupId
            },
            order: [['timeStamp', 'ASC']]
        });
        res.status(200).json({ result, success: true });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: err, success: false });
    }
};