const express = require("express");
const instaRouter = require("./router/instaRouter");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbconfig");
const app = express();
const cors = require("cors");


dbConnect();
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true })); //Third-party middleware

app.use("/api/insta/", instaRouter);
app.use("/", (req, res) => {
  res.status(200).json({
    success: "true",
    message: "fullStack userManagement app like Instagram",
  });
});

module.exports = app;
