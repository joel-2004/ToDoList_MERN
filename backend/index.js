const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.end("Home");
})
app.listen(5000, () => {
    console.log("listening at 5000");
})