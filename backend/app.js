const express = require('express');
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const notificationRoutes = require("./routes/notification.route");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const cloudinaryConfig = require("./cloudinary/cloudinary.config");

const __dirname = path.resolve();

cloudinaryConfig();

app.use(express.json({ limit: "5mb" })); // to parse req.body // limit shouldn't be too high to prevent DoS attack
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)
app.use(cookieParser());
app.use(cors());
app.use(middleware.requestLogger)
app.disable("x-powered-by");

app.get("/", (req, res) => {
    res.send("Backend Server is ready!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

if (config.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

module.exports = app;