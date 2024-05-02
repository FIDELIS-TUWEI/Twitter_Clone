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

const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        // check if user wants to follow/unfollow themselves
        if (id === req.user._id.toString()) {
            return res.status(400).json({ error: "You can't follow/unfollow yourself" });
        };

        // check if user exists
        if (!userToModify || !currentUser) {
            return res.status(404).json({ error: "User not found!" });
        };

        // check if is following user
        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            // Unfollow the user
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } }); // remove the user from the followers array
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } }); // remove the user from the following array

            res.status(200).json({ message: "User Unfollowed successfully" });
        } else {
            // follow the user
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } }); // add user to the followers array
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } }) // add user to the following user's array

            // send notification
            res.status(200).json({ message: "User followed successfully" });
        }
    } catch (error) {
        logger.error("Error in followUnfollowUser controller", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUserProfile, followUnfollowUser
}