const Msg = require('../models/msgModel');
const jwt = require('jsonwebtoken');
exports.msgControllerPost = async (req, res) => {
    try {

        const { message, token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SecretKey);
        console.log(decoded.id, message);
        const userId = decoded.id;
        const result = await Msg.create({
            message: message
        });
        res.status(200).json({ message: result, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};