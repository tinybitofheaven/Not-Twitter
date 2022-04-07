// const express = require("express"),
//   router = express.Router(),
//   passport = require("passport"),
//   mongoose = require("mongoose"),
//   User = mongoose.model("User");
const express = require("express"),
  router = express.Router(),
  passport = require("passport");
const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const Posts = mongoose.model("Posts");
const Tweet = mongoose.model("Tweet");
// const app = express();

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/feed", (req, res) => {
  Tweet.find({}, function (err, tweets, count) {
    console.log(tweets);
    res.render("feed", { tweets: tweets });
  });
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/post", (req, res) => {
  res.render("post");
});

router.post("/post", (req, res) => {
  const user = "admin-01"; //change to get users dynamically
  const tweet = req.body.input;
  //get image

  new Tweet({
    user_id: user,
    tweet: tweet,
  }).save(function (err, review, count) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/feed");
    }
  });
});

router.post("/signup", (req, res) => {
  res.render("signup");
  // const { username, password } = req.body;
  // User.register(new User({ username }), req.body.password, (err, user) => {
  //   if (err) {
  //     res.render("signup", {
  //       message: "Your registration information is not valid",
  //     });
  //   } else {
  //     passport.authenticate("local")(req, res, function () {
  //       res.redirect("/");
  //     });
  //   }
  // });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (user) {
      req.logIn(user, (err) => {
        res.redirect("/");
      });
    } else {
      res.render("login", { message: "Your login or password is incorrect." });
    }
  })(req, res, next);
});

module.exports = router;
