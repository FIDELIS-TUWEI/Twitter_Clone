require('dotenv').config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let JWT_SECRET = process.env.JWT_SECRET;
let NODE_ENV = process.env.NODE_ENV;

let CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
let CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
let CLODINARY_API_SECRET = process.env.CLODINARY_API_SECRET;

module.exports = {
    PORT, MONGODB_URI, JWT_SECRET, NODE_ENV,
    CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLODINARY_API_SECRET
};