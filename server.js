"use strict"
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.use("/", (req, res, next) => {
    return res.send(path.join(__dirname, "build", "index.html"));
})

app.listen(3000, (err) => {
    if(err) console.log("Start server unsuccess");
    console.log("Start server success");
})