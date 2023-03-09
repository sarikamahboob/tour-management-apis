const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(cors());

// routes
const tourRoute = require("./routes/tour.route");


app.get("/", (req, res) => {
    res.send("Route is working");
})

app.use("/api/v1/tours", tourRoute);

module.exports = app;