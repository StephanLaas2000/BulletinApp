const express = require("express");
const app = express();
const urlprefix = "/api";

const mongoose = require("mongoose");
const fs = require("fs");
const cert = fs.readFileSync("keys/certificate.pem");
const options = {
  server: { sslCA: cert },
};
const connstring =
  "mongodb+srv://admin:limVNt6dlmpglq5U@cluster0.2xuppb2.mongodb.net/TASK2?retryWrites=true&w=majority";

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

mongoose
  .connect(connstring)
  .then(() => {
    console.log("Connected :-");
  })
  .catch(() => {
    console.log("NOT connected :-(");
  }, options);

app.use(express.json());

app.use((reg, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use(urlprefix + "/post", postRoutes);
app.use(urlprefix + "/users", userRoutes);

module.exports = app;
