var passport = require("passport");
var Strategy = require("passport-facebook");

module.exports = function () {
  passport.use(
    new Strategy(
      {
        clientID: process.env["FACEBOOK_CLIENT_ID"],
        clientSecret: process.env["FACEBOOK_CLIENT_SECRET"],
        callbackURL: "/oauth2/redirect/www.facebook.com",
        state: true,
      },
      function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};