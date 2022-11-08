const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
var ExpressBrute = require("express-brute");
var morgan = require("morgan");

const app = express();

app.use(helmet());

var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store);

morgan("tiny");

morgan(":method :url :status :res[content-length] - :response-time ms");

morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

router.post("/signup", bruteforce.prevent, (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", bruteforce.prevent, (req, res) => {
  let fectchedUser;
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication Failure, Password or Username is incorrect",
        });
      }
      fectchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message:
            "Authentication Failure, Please re-enter password and username.",
        });
      }

      const token = jwt.sign(
        { username: fectchedUser.username, userid: fectchedUser._id },
        "secrect_this_should_be_longer_than_it_is",
        { expiresIn: "7d" }
      );

      res.status(200).json({ token: token });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication failure3",
      });
    });
});

app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

module.exports = router;
