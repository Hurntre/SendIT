import trimmerMiddleware from './trimmer.middlewares';
import signupValidation from './signupValidation';
import userCheckByEmail from './userCheckByEmail.middleware';
import userCheckByPhone from './userCheckByPhone.middleware';
import loginValidation from './loginValidation';
import resetValidations from './resetValidation';

export default {
  trimmerMiddleware,
  signupValidation,
  loginValidation,
  userCheckByEmail,
  userCheckByPhone,
  resetValidations,
};
