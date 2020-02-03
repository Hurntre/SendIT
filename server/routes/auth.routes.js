import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const authRoute = express.Router();

const {
  signupValidation,
  loginValidation,
  userCheckByEmail,
  userCheckByPhone,
  resetValidations,
} = middlewares;
const { authController } = controllers;

authRoute.post(
  '/signup',
  signupValidation,
  userCheckByEmail,
  userCheckByPhone,
  authController.signUpController
);

authRoute.post('/login', loginValidation, authController.loginController);

authRoute.post(
  '/reset',
  resetValidations.emailValidation,
  authController.passwordResetRequest
);

authRoute.get('/reset/:token', authController.passwordResetPageRequest);

authRoute.post(
  '/reset/:token',
  resetValidations.newPasswordValidation,
  resetValidations.passwordMatchCheck,
  authController.updatePassword
);
export default authRoute;
