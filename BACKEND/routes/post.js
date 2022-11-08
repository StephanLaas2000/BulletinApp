const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const checkauth = require("../check-auth");
const helmet = require("helmet");
var ExpressBrute = require("express-brute");

const app = express();

var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store);

app.use(helmet());

router.get("", (req, res) => {
  Post.find().then((posts) => {
    res.json({
      message: "Post found",
      posts: posts,
    });
  });
});

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;

router.post("", checkauth, bruteforce.prevent, (req, res) => {
  const post = new Post({
    title: req.body.title,
    status: req.body.status,
    description: req.body.description,
    department: req.body.department,
    username: req.body.username,
    createdAt: currentDate.toString(),
  });
  post.save().then(() => {
    res.status(201).json({
      message: "Post created",
      post: post,
    });
  });
});

router.delete("/:id", checkauth, (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Post Deleted" });
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
