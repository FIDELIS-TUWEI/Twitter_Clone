const Post = require("../models/post.model");
const User = require("../models/user.model");
const Notification = require("../models/notification.model");
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

const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        // check if text is in the req.body
        if (!text) return res.status(400).json({ error: "Text field is required" });

        // check if post exists
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found!" });

        // comment on post
        const comment = { user: userId, text };
        post.comments.push(comment);
        await post.save();

        res.status(200).json(post);

    } catch (error) {
        logger.error("Error in commentOnPost controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;

        // find post
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found!" });

        // check if user liked the post
        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            // unlike the post
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });

            res.status(200).json({ message: "Post Unliked Successfully!" });
        } else {
            // like the post
            post.likes.push(userId);
            await post.save();

            // send notification
            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like"
            })

            await notification.save();

            res.status(200).json({ message: "Post liked successfully" });
        };

    } catch (error) {
        logger.error("Error in likeUnlikePost", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found!" });

        // check if post being deleted was created by the user
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({ error: "You are not authorized to delete this post!" });
        }

        // check if post has an image and delete in cloudinary
        if (post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        // delete post
        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Post deleted sucessfully" });

    } catch (error) {
        logger.error("Error in deletePost controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createPost, commentOnPost, likeUnlikePost, deletePost
}