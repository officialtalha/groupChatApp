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
exports.getAllUsersControllerGetParam = async (req, res) => {
    try {
        const selectedRceiverId = req.params.recieverId;
        const result = await User.findAll({
            attributes: [
                'name'
            ],
            where: {
                id: selectedRceiverId
            }
        });
        res.status(200).json({ result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};
exports.getAllUsersControllerGetParamOnlyUserName = async (req, res) => {
    try {
        const userId = req.params.userId;
        const loggedInUserId = req.user.id;
        const result = await User.findAll({
            attributes: [
                'id',
                'name'
            ],
            where: {
                id: userId
            }
        });
        res.status(200).json({ result, loggedInUserId, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};
exports.getAllUsersControllerGetParamByMobile = async (req, res) => {
    try {
        const mobile = req.params.mobile;
        const result = await User.findAll({
            attributes: [
                'id',
                'name'
            ],
            where: {
                mobile
            }
        });
        res.status(200).json({ result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};
exports.getAllUsersControllerGetParamByName = async (req, res) => {
    try {
        const name = req.params.name;
        const result = await User.findAll({
            attributes: [
                'id',
                'name'
            ],
            where: {
                name
            }
        });
        res.status(200).json({ result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};

exports.getAllUsersControllerGetParamByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const result = await User.findAll({
            attributes: [
                'id',
                'name'
            ],
            where: {
                email
            }
        });
        res.status(200).json({ result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};