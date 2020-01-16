import trimmerMiddleware from './trimmer.middlewares';
import signupValidation from './signupValidation';
import userCheckByEmail from './userCheckByEmail.middleware';
import userCheckByPhone from './userCheckByPhone.middleware';
import loginValidation from './loginValidation';

export default {
  trimmerMiddleware,
  signupValidation,
  loginValidation,
  userCheckByEmail,
  userCheckByPhone,
};
