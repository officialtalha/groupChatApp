const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const logger = require('../middleware/logger');
exports.signUpPost = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        const ifExist = await User.findAll(
            {
                where: {
                    email: email
                }
            }
        );
        if (ifExist.length > 0) {
            res.status(200).json({ message: 'USER ALREADY EXIST!', success: false });
        } else {
            const hash = await bcrypt.hash(password, 10);
            await User.create({ name, email, mobile, password: hash });
            res.status(200).json({ message: 'SIGNUP SUCCESSFULL!', success: true });
        }
    } catch (err) {
        res.status(500).json({ message: err, success: false });
        logger.error(err);
    }
};