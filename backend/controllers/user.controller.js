const User = require("../models/user.model");
const logger = require("../utils/logger");

const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).select("-password");

        if (!user) return res.status(404).json({ error: "User not found!" });

        res.status(200).json(user);

    } catch (error) {
        logger.error("Error in getUserProfile controller", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUserProfile,
}