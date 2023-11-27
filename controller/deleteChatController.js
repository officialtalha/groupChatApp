const logger = require('../middleware/logger');
const Msg = require('../models/msgModel');
exports.deleteChatControllerDelete = async (req, res) => {
    try {
        const id = req.user.id;
        await Msg.destroy();
        res.status(200).json({ success: true });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: err, success: false });
    }
};