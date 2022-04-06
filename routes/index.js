// const express = require("express"),
//   router = express.Router(),
//   passport = require("passport"),
//   mongoose = require("mongoose"),
//   User = mongoose.model("User");
const express = require("express"),
  router = express.Router(),
  passport = require("passport");

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
  res.render("feed");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/post", (req, res) => {
  res.render("post");
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
