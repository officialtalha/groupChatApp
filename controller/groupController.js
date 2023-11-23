const Grp = require('../models/groupModel');
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