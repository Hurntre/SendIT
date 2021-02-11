import passport from 'passport';
import googleStrategy from 'passport-google-oauth20';
import githubStrategy from 'passport-github2';
import User from '../db/models/user';
import controllers from '../controllers';

const {
  authController: { googlePassportCallback, githubPassportCallback },
} = controllers;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((err, user) => {
    done(err, user);
  });
});

const googleConfig = {
  callbackURL: '/api/v1/auth/google/redirect',
  clientID: process.env.googleClientID,
  clientSecret: process.env.googleClientSecret,
};

const githubConfig = {
  callbackURL: '/api/v1/auth/github/redirect',
  clientID: process.env.githubClientID,
  clientSecret: process.env.githubClientSecret,
};

passport.use(new googleStrategy(googleConfig, googlePassportCallback));

passport.use(new githubStrategy(githubConfig, githubPassportCallback));
