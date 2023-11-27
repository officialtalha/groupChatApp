const logger = require('../middleware/logger');
const Admin = require('../models/adminModel');
const usersGroups = require('../models/usersGroupsModel');
exports.usersGroupsControllerPost = async (req, res) => {
    try {
        const { userId, GroupId } = req.body;
        const result = await usersGroups.create({ userId, GroupId });
        res.status(200).json({ result, success: true });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ err, success: false });
    }
};
exports.usersGroupsControllerPostParams = async (req, res) => {
    try {
        const { userId, GroupId } = req.body;

        await Admin.destroy({
            where: {
                adminId: userId,
                groupId: GroupId
            }
        });

        await usersGroups.destroy({
            where: {
                userId,
                GroupId
            }
        });
        res.status(200).json({ result, success: true });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ err, success: false });
    }
};
exports.usersGroupsControllerGet = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const result = await usersGroups.findAll({
            where: {
                GroupId: groupId
            }
        });
        res.status(200).json({ result, success: true });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ err, success: false });
    }
};