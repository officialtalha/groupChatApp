const Sequelize = require('sequelize');
const User = require('../models/userModel');

exports.getAllUsersControllerGet = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const loggedInUserName = req.user.name;
        const result = await User.findAll({
            attributes: [
                'id',
                'name'
            ]
        });
        res.status(200).json({ result, loggedInUserId, loggedInUserName, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};