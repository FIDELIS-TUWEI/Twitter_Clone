const User = require("../models/user.model");
const config = require("../utils/config");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
    
        // check if token exists
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No Token Provided!" });
        };
    
        const decoded = jwt.verify(token, config.JWT_SECRET);
    
        // check if token is valid
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized: Invalid Token" })
        }
    
        const user = await User.findById(decoded.userId).select("-password");
    
        // check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not Found!" });
        };
    
        req.user = user;
    
        next();

    } catch (error) {
        logger.error("Error in protectRoute middleware", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    };

};

module.exports = {
    protectRoute
}