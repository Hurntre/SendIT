import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const authRoute = express.Router();

const { signupValidation, userCheckByEmail, userCheckByPhone } = middlewares;
const { authController } = controllers;

authRoute.post(
  '/signup',
  signupValidation,
  userCheckByEmail,
  userCheckByPhone,
  authController.signUpController
);

export default authRoute;
