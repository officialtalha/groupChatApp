const usersGroups = require('../models/usersGroupsModel');
exports.usersGroupsControllerPost = async (req, res) => {
    try {
        const { userId, GroupId } = req.body;
        const result = await usersGroups.create({ userId, GroupId });
        res.status(200).json({ result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, success: false });
    }
};