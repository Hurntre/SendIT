import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const authRoute = express.Router();

const { userSchemaValidation } = middlewares;
const { authController } = controllers;

authRoute.post(
  '/signup',
  userSchemaValidation,
  authController.signUpController
);

export default authRoute;
