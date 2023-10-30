const express = require("express");
const instaRouter = require('./router/instaRouter')
const cookieParser = require('cookie-parser')
const dbConnect = require('./config/dbconfig')
const app = express();

dbConnect()
app.use(express.json());
app.use(cookieParser());

app.use("/api/insta/",instaRouter)
app.use("/", (req, res) => {
  res.status(200).json({
    success: "true",
    message: "fullStack userManagement app like Instagram"
  });
});

module.exports = app;
