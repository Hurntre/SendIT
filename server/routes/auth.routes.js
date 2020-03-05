/* eslint-disable no-unused-vars */
import express from 'express';
import passport from 'passport';
import controllers from '../controllers';
import middlewares from '../middlewares';
import passportSetup from '../config/passportSetup';

const authRoute = express.Router();

const {
  signupValidation,
  loginValidation,
  userCheckByEmail,
  userCheckByPhone,
  resetValidations,
} = middlewares;

const {
  authController: {
    loginController,
    passwordResetPageRequest,
    passwordResetRequest,
    signUpController,
    updatePassword,
    socialRedirect,
  },
} = controllers;

authRoute.post(
  '/signup',
  signupValidation,
  userCheckByEmail,
  userCheckByPhone,
  signUpController
);

authRoute.post('/login', loginValidation, loginController);

authRoute.post(
  '/reset',
  resetValidations.emailValidation,
  passwordResetRequest
);

authRoute.get('/reset/:token', passwordResetPageRequest);

authRoute.post(
  '/reset/:token',
  resetValidations.newPasswordValidation,
  resetValidations.passwordMatchCheck,
  updatePassword
);

authRoute.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/user.phonenumbers.read',
    ],
  })
);

authRoute.get(
  '/google/redirect',
  passport.authenticate('google'),
  socialRedirect
);

authRoute.get('/github', passport.authenticate('github', { scope: ['user'] }));

authRoute.get(
  '/github/redirect',
  passport.authenticate('github'),
  socialRedirect
);

export default authRoute;
