const Grp = require('../models/groupModel');
const Sequelise = require('sequelize');
exports.groupControllerPost = async (req, res) => {
    try {
        const { GroupName, members, admin } = req.body;
        await Grp.create({ GroupName, adminId: admin, members });
        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};

exports.groupControllerGet = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const id = loggedInUserId.toString();
        const loggedInUserName = req.user.name;
        const members = await Grp.findAll({
            attributes: ['id', 'GroupName'],
            where: {
                members: {
                    [Sequelise.Op.like]: `%${id}%`
                }
            }
        });
        res.status(200).json({ members, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};

exports.groupControllerGetParam = async (req, res) => {
    try {
        const selectedGroupId = req.params.groupId;
        const result = await Grp.findOne({
            attributes: ['GroupName'],
            where: {
                id: selectedGroupId
            }
        });
        res.status(200).json({ result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};