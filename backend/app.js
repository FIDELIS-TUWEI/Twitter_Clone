const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

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

module.exports = app;