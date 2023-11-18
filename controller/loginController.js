const User = require('../models/userModel');
const bcrypt = require('bcrypt');
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
                res.status(200).json({ message: 'login Successful!', success: true });
            } else {
                res.status(200).json({ message: 'password is incorrect!', success: false });
            }
        } else {
            res.status(200).json({ message: 'User does not exist!', success: false });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};

