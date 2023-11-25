const Grp = require('../models/groupModel');
const usersGroups = require('../models/usersGroupsModel');
const Sequelise = require('sequelize');

exports.groupControllerPostForCreatingGroup = async (req, res) => {
    try {
        const { groupName } = req.body;
        //entry in group model
        const GroupId = await Grp.create({ groupName });
        res.status(200).json({ groupId: GroupId.id, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};
exports.groupControllerPutForChangeName = async (req, res) => {
    try {
        const { groupName, id } = req.body;

        await Grp.update({
            groupName
        },
            {
                where: {
                    id
                }
            });
        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};

exports.groupControllerGet = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;

        //first getting groups ids from which user belongs to
        const groupsIds = await usersGroups.findAll({
            attributes: ['GroupId'],
            where: {
                userId: loggedInUserId
            }
        });
        let arr = [];
        for (let i = 0; i < groupsIds.length; i++) {
            {
                const result = await Grp.findAll({
                    attributes: ['id', 'groupName'],
                    where: {
                        id: groupsIds[i].dataValues.GroupId
                    }
                });
                arr.push({ id: result[0].dataValues.id, groupName: result[0].dataValues.groupName });
            }
        }
        res.status(200).json({ arr, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};
exports.groupControllerGetParam = async (req, res) => {
    try {
        const selectedGroupId = req.params.groupId;
        const loggedInUserId = req.user.id;
        const result = await Grp.findOne({
            where: {
                id: selectedGroupId
            }
        });
        res.status(200).json({ result, loggedInUserId, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};

exports.groupControllerGetParamAllUsersfromThisGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const result = await usersGroups.findAll({
            attributes: [
                'userId'
            ],
            where: {
                GroupId: groupId
            }
        });
        res.status(200).json({ result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};