// const express = require("express"),
//   router = express.Router(),
//   passport = require("passport"),
//   mongoose = require("mongoose"),
//   User = mongoose.model("User");
const express = require("express"),
  router = express.Router(),
  passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Tweet = mongoose.model("Tweet");

function loggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    // The user is logged in
    res.redirect("/feed");
  } else {
    // The user is logged out
    res.redirect("/login");
  }
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

router.get("/feed", loggedIn, (req, res) => {
  Tweet.find({}, function (err, tweets, count) {
    const dates = [];
    for (const tweet of tweets) {
      const month = tweet.createdAt.getUTCMonth() + 1; //months from 1-12
      const day = tweet.createdAt.getUTCDate();
      const year = tweet.createdAt.getUTCFullYear();
      const hoursAndMinutes =
        tweet.createdAt.getHours() + ":" + tweet.createdAt.getMinutes();
      const date = day + "/" + month + "/" + year + " " + hoursAndMinutes;
      tweet["date"] = date;
    }
    //console.log(tweets);
    res.render("feed", { tweets: tweets, dates: dates });
  });
});

router.get("/profile", loggedIn, (req, res) => {
  console.log(req.user);
  Tweet.find({ user_id: req.user.username }, function (err, tweets, count) {
    res.render("profile", { user: req.user, tweets: tweets });
  });
});

router.get("/post", loggedIn, (req, res) => {
  res.render("post");
});

router.post("/delete", (req, res) => {
  var id = req.body.id;
  Tweet.findByIdAndRemove(id, function (err, deletedTweet) {
    // handle any potential errors here
    res.redirect("/profile");
  });
});

router.post("/post", (req, res) => {
  const user = req.user.username; //change to get users dynamically
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
  var username = req.body.username;
  var password = req.body.password;
  User.register(
    new User({ username, hash: password, name: username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.render("signup", {
          message: "Your registration information is not valid",
        });
      } else {
        passport.authenticate("local", {
          successRedirect: "/",
          failureRedirect: "/login",
        })(req, res, function () {
          res.redirect("/");
        });
      }
    }
  );
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (user) {
      req.logIn(user, (err) => {
        res.redirect("/feed");
      });
    } else {
      res.render("login", { message: "Your login or password is incorrect." });
    }
  })(req, res, next);
});

module.exports = router;
