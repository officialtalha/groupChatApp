const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, process.env.JWT_SecretKey);
        const user = await User.findOne({
            attrbutes: ['id', 'name'],
            where: {
                id: decoded.id
            }
        });
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};