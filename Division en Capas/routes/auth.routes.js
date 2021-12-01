const express = require("express");
const router = express.Router();
var passport = require("passport");
var authController = require("../controllers/auth");

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get(
  "/login/federated/www.facebook.com",
  passport.authenticate("facebook")
);

router.get(
  "/oauth2/redirect/www.facebook.com",
  passport.authenticate("facebook", {
    assignProperty: "federatedUser",
    failureRedirect: "/login",
  }),
  function (req, res, next) {
    req.login(req.federatedUser, function (err) {
      if (err) {
        return next(err);
      }
      authController.sendLoginEmails(req.federatedUser)
      res.redirect("/");
    });
  }
);

router.get("/logout", function (req, res, next) {
  req.logout();
  authController.sendLogoutEmail(req.federatedUser);
  res.redirect("/");
});

module.exports = router;