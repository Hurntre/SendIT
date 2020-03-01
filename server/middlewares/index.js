import trimmerMiddleware from './trimmer.middlewares';
import signupValidation from './signupValidation';
import userCheckByEmail from './userCheckByEmail.middleware';
import userCheckByPhone from './userCheckByPhone.middleware';
import loginValidation from './loginValidation';
import resetValidations from './resetValidation';
import verifyToken from './isLoggedIn';
import checkUserRole from './checkUserRole';

export default {
  trimmerMiddleware,
  signupValidation,
  loginValidation,
  userCheckByEmail,
  userCheckByPhone,
  resetValidations,
  verifyToken,
  checkUserRole,
};
