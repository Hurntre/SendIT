import { Router } from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const router = Router();

const { signupValidation, userCheckByEmail, userCheckByPhone } = middlewares;

const {
  userController: { signUpController },
} = controllers;

/**
 * @route POST api/v1/users
 * @description Register a user
 * @access Public
 */
router.post(
  '/',
  signupValidation,
  userCheckByEmail,
  userCheckByPhone,
  signUpController
);

export default router;
