const Post = require("../models/post.model");
const User = require("../models/user.model");
const logger = require("../utils/logger");
const cloudinary = require("cloudinary").v2;

const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user._id.toString();

        // check if user exists
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found!" });

        // check if text and image are in req.body
        if (!text || !img) return res.status(400).json({ error: "Post must have text or image" });

        // upload image to cloudinary
        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        // create new post
        const newPost = new Post({
            user: userId,
            text,
            img
        });

        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        logger.error("Error in createPost controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deletePost = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

module.exports = {
    createPost, deletePost
}