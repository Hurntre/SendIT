import trimmerMiddleware from './trimmer.middlewares';
import signupValidation from './signupValidation';
import userCheckByEmail from './userCheckByEmail.middleware';
import userCheckByPhone from './userCheckByPhone.middleware';

export default {
  trimmerMiddleware,
  signupValidation,
  userCheckByEmail,
  userCheckByPhone,
};
