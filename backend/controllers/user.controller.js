const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const logger = require("../utils/logger");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");


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
            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id
            });

            await newNotification.save();
            res.status(200).json({ message: "User followed successfully" });
        };

    } catch (error) {
        logger.error("Error in followUnfollowUser controller", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getSuggestedUsers = async (req, res) => {
    try {
        // Exclude yourself and users you follow from suggested users
        const userId = req.user._id;

        const usersFollowedByMe = await User.findById(userId).select("following");

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId }
                }
            },
            { $sample: { size: 10 } }
        ]);

        // filter users followed by me
        const filteredUsers = users.filter(user => !usersFollowedByMe.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0,4);

        // suggest users and exclude their password
        suggestedUsers.forEach(user => user.password = null);
        res.status(200).json(suggestedUsers);

    } catch (error) {
        logger.error("Error in getSuggestedUsers controller", error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { fullName, username, email, currentPassword, newPassword, bio, link } = req.body; 
    let { profileImg, coverImg } = req.body;
    
    // check the current user id
    const userId = req.user._id;

    try {
     // check if user exists
     let user = await User.findById(userId);
     if (!user) return res.status(404).json({ error: "User not found!" });

     // check if password is provided
     if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
        return res.status(400).json({ error: "Please provide both the current password and new password" });
     };

     // update password 
     if (currentPassword && newPassword) {
        // check if currentpassword matches in DB
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ error: "Current password provided is incorrect" });

        // check if the new password ,eets the requirements
        if (newPassword.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters long!" });

        // hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
     };

     // Update user profile image
     if (profileImg) {
        // delete the old image and upload a new one
        if (user.profileImg) {
            await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
        }
        const uploadedResponse = await cloudinary.uploader.upload(profileImg);
        profileImg = uploadedResponse.secure_url;
     };

     // Update user cover image
     if (coverImg) {
        // delete the old image and upload a new one
        if (user.coverImg) {
            await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
        }
        const uploadedResponse = await cloudinary.uploader.upload(coverImg);
        coverImg = uploadedResponse.secure_url;
     };

     user.fullName = fullName || user.fullName;
     user.username = username || user.username;
     user.email = email || user.email;
     user.bio = bio || user.bio;
     user.link = link || user.link;
     user.profileImg = profileImg || user.profileImg;
     user.coverImg = coverImg || user.coverImg;

     // save the user
     user = await user.save();

     // password should be null in the response
     user.password = null;

     return res.status(200).json(user);

    } catch (error) {
        logger.error("Error in updateUser controller", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUserProfile, followUnfollowUser, getSuggestedUsers, updateUser
};