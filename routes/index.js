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
  //https://stackoverflow.com/questions/38820251/how-is-req-isauthenticated-in-passport-js-implemented
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

router.get("/", (req, res) => {
  res.redirect("/feed");
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
    res.render("feed", { tweets: tweets });
  });
});

router.post("/search", loggedIn, (req, res) => {
  Tweet.find({}, function (err, tweets, count) {
    // console.log(req.body.keyword);
    const results = tweets.filter((tweet) =>
      tweet.tweet.includes(req.body.keyword)
    );
    // console.log(results);
    results.map((tweet) => {
      const month = tweet.createdAt.getUTCMonth() + 1; //months from 1-12
      const day = tweet.createdAt.getUTCDate();
      const year = tweet.createdAt.getUTCFullYear();
      const hoursAndMinutes =
        tweet.createdAt.getHours() + ":" + tweet.createdAt.getMinutes();
      const date = day + "/" + month + "/" + year + " " + hoursAndMinutes;
      tweet["date"] = date;
    });

    res.render("feed", {
      tweets: results,
      search: 'Search: "' + req.body.keyword + '"',
    });
  });
});

router.get("/profile", loggedIn, (req, res) => {
  // console.log(req.user);
  Tweet.find({}, function (err, tweets, count) {
    const results = tweets.filter(
      (tweet) => tweet.user_id === req.user.username
    );
    res.render("profile", { user: req.user, tweets: results });
  });
});

router.get("/post", loggedIn, (req, res) => {
  res.render("post");
});

router.post("/delete", (req, res) => {
  var id = req.body.id;
  Tweet.findByIdAndRemove(id, function (err, deletedTweet) {
    res.redirect("/profile");
  });
});

router.post("/post", (req, res) => {
  const user = req.user.username;
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
