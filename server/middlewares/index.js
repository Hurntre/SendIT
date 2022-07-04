import trimmerMiddleware from './trimmer.middlewares';
import signupValidation from './signupValidation';
import userCheckByEmail from './userCheckByEmail.middleware';
import userCheckByPhone from './userCheckByPhone.middleware';
import loginValidation from './loginValidation';
import resetValidations from './resetValidation';
import newParcelValidation from './newParcelValidation';
import auth from './auth';
import verifyPickUpDate from './pickUpDateValidation';
import verifyReceiverAddress from './addressValidation';
import checkUserRole from './checkUserRole';
import deliveryDateSetter from './deliveryDateSetter';

export default {
  trimmerMiddleware,
  signupValidation,
  loginValidation,
  userCheckByEmail,
  userCheckByPhone,
  resetValidations,
  newParcelValidation,
  auth,
  verifyPickUpDate,
  verifyReceiverAddress,
  checkUserRole,
  deliveryDateSetter,
};
