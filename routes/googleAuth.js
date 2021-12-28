const passport = require("passport");

var GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
     new GoogleStrategy(
          {
               clientID:
                    "56249346138-4538g35uqndp3d6m0gk6fe3nf3jqggpn.apps.googleusercontent.com",
               clientSecret: "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",
               callbackURL: "http://localhost:5000/google/callback",
               passReqToCallback: true,
          },
          function (request, accessToken, refreshToken, profile, done) {
               // User.findOrCreate(
               //      { googleId: profile.id },
               //      function (err, user) {
               //           return done(err, user);
               //      }
               // );

               return done(err, profile);
          }
     )
);

passport.serializeUser(function (user, done) {
     done(null, user);
});
passport.deserializeUser(function (user, done) {
     done(null, user);
});
