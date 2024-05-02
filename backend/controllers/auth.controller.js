const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");
const generateTokenAndSetCookie = require("../utils/generateToken");

const signup = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        // 1. check if email matches the correct format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format!" })
        };

        // 2. check if user exists
        const exisitngUser = await User.findOne({ username });
        if (exisitngUser) {
            return res.status(400).json({ error: "Username is already taken!" });
        }

        // 3. check if email exists
        const exisitngEmail = await User.findOne({ email });
        if (exisitngEmail) {
            return res.status(400).json({ error: "Email is already taken!" })
        }

        // check password length
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be atleast 6 characters long!" })
        }

        // 4. hash passord
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. create new user
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        });

        // 6. Check all requiremwnts are met and generate token as cookie
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg
            })
        } else {
            res.status(400).json({ error: "Invalid user data!" });
        }

    } catch (error) {
        logger.error("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    res.json({
        data: "You reached the login endpoint"
    });
};

const logout = async (req, res) => {
    res.json({
        data: "You have reached the logout endpoint"
    });
};

module.exports = {
    signup, login, logout
};