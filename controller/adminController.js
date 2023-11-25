const Admin = require('../models/adminModel');

exports.adminControllerPost = async (req, res) => {
    try {
        const { adminId, groupId } = req.body;
        await Admin.create({ adminId, groupId });
        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};
exports.adminControllerGet = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const groupId = req.params.groupId;
        const result = await Admin.findOne({
            where: {
                adminId: loggedInUserId,
                groupId
            }
        });
        if (result == null) {
            res.status(200).json({ message: 'not admin', success: true });
        } else {
            res.status(200).json({ message: 'admin', success: true });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};