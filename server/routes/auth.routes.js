import express from 'express';
import controllers from '../controllers';

const authRoute = express.Router();

const { authController } = controllers;

authRoute.post('/signup',
  authController.signUpController
);

export default authRoute;
