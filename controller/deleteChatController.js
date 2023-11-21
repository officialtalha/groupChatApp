const Msg = require('../models/msgModel');
exports.deleteChatControllerDelete = async (req, res) => {
    try {
        const id = req.user.id;
        await Msg.destroy({
            where: {
                userId: id
            }
        });
        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err, success: false });
    }
};