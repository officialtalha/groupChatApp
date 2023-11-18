const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.loginControllerPost = async (req, res) => {
    try {
        const { username, password } = req.body;
        const isValid = await User.findOne({
            where: {
                email: username
            }
        });
        if (isValid != null) {
            const cracked = await bcrypt.compare(password, isValid.password);
            if (cracked) {
                const token = await jwt.sign({ id: isValid.id }, process.env.JWT_SecretKey);
                res.status(200).json({ message: 'login Successful!', success: true, token, name: isValid.name });
            } else {
                res.status(401).json({ message: 'password is incorrect!', success: false });
            }
        } else {
            res.status(404).json({ message: 'User not found!', success: false });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};

