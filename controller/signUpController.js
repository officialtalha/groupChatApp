exports.signUpPost = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
    } catch (err) {
        res.status.json({ message: err, success: false });
        console.log(err);
    }
};