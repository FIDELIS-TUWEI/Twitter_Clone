const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const cloudinaryConfig = require("./cloudinary/cloudinary.config");

cloudinaryConfig();

app.use(express.json()); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)
app.use(cookieParser());
app.use(cors());
app.disable("x-powered-by");

app.get("/", (req, res) => {
    res.send("Backend Server is ready!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;