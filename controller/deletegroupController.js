const Message = require('../models/msgModel');
const Admin = require('../models/adminModel');
const UsersGroups = require('../models/usersGroupsModel');
const Grp = require('../models/groupModel');

exports.deletegroupControllerDelete = async (req, res) => {
    try {
        const groupId = req.params.groupId;

        await Message.destroy({
            where: {
                groupId
            }
        });

        await Admin.destroy({
            where: {
                groupId
            }
        });

        await UsersGroups.destroy({
            where: {
                GroupId: groupId
            }
        });

        await Grp.destroy({
            where: {
                id: groupId
            }
        });
        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, success: false });
    }
};