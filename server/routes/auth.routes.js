/* eslint-disable no-unused-vars */
import { Router } from 'express';
import passport from 'passport';
import controllers from '../controllers';
import middlewares from '../middlewares';
import passportSetup from '../config/passportSetup';

const router = Router();

const {
  loginValidation,
  resetValidations: {
    emailValidation,
    newPasswordValidation,
    passwordMatchCheck,
  },
} = middlewares;

const {
  authController: {
    loginController,
    passwordResetPageRequest,
    passwordResetRequest,
    updatePassword,
    socialRedirect,
  },
} = controllers;

/**
 * @route POST api/v1/auth
 * @description Authenticate user and return token
 * @access Public
 */
router.post('/', loginValidation, loginController);

/**
 * @route POST api/v1/auth/reset
 * @description Request password reset
 * @access Public
 */
router.post('/reset', emailValidation, passwordResetRequest);

/**
 * @route GET api/v1/auth/reset/:token
 * @description Get password reset page
 * @access Private
 */
router.get('/reset/:token', passwordResetPageRequest);

/**
 * @route POST api/v1/auth/reset/:token
 * @description create new password
 * @access Private
 */
router.post(
  '/reset/:token',
  newPasswordValidation,
  passwordMatchCheck,
  updatePassword
);

/**
 * @route GET api/v1/auth/google
 * @description Google Oauth
 * @access Public
 */

router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/user.phonenumbers.read',
    ],
  })
);

/**
 * @route GET api/v1/auth/google/redirect
 * @description Google Oauth redirect page
 * @access Private
 */
router.get('/google/redirect', passport.authenticate('google'), socialRedirect);

/**
 * @route GET api/v1/auth/github
 * @description Github Oauth
 * @access Public
 */
router.get('/github', passport.authenticate('github', { scope: ['user'] }));

/**
 * @route GET api/v1/auth/github/redirect
 * @description Github Oauth redirect page
 * @access Private
 */
router.get('/github/redirect', passport.authenticate('github'), socialRedirect);

export default router;
