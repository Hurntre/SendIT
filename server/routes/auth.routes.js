import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const authRoute = express.Router();

const {
  signupValidation,
  loginValidation,
  userCheckByEmail,
  userCheckByPhone,
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

export default authRoute;
