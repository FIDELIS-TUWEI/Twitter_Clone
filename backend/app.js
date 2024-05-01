const express = require('express');
const app = express();
const authRoutes = require("./routes/auth.routes");


app.disable("x-powered-by");

app.get("/", (req, res) => {
    res.send("Backend Server is ready!");
});

app.use("/api/auth", authRoutes);

module.exports = app;