const express = require('express');
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth.routes");

app.use(express.json());
app.use(cors());
app.disable("x-powered-by");

app.get("/", (req, res) => {
    res.send("Backend Server is ready!");
});

app.use("/api/auth", authRoutes);

module.exports = app;