const Msg = require('../models/msgModel');
const jwt = require('jsonwebtoken');
exports.msgListControllerGet = async (req, res) => {
    try {
        const id = req.user.id;
        const name = req.user.name;
        const result = await Msg.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json({ message: result, success: true, name });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};

//attributes: ['message'],