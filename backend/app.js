const express = require("express");
// import express from "express";

const app = express();

app.use("/api/insta/",instaRouter)
app.use("/", (req, res) => {
  res.status(200).json({
    success: "true",
    message: "fullStack userManagement app like InstaGram"
  });
});

module.exports = app;
// export default app;

