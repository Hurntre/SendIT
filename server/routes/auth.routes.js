import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const authRoute = express.Router();

const { joiValidation } = middlewares;
const { authController } = controllers;

authRoute.post('/signup', joiValidation, authController.signUpController);

export default authRoute;
