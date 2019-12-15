import UserModel from '../db/models/user';

const userCheckByPhone = (req, res, next) => {
  const userPhone = req.body.phoneNumber;
  UserModel.find({ phoneNumber: userPhone }, (error, userFoundByPhone) => {
    if (userFoundByPhone.length > 0) {
      res.status(400).send({
        success: false,
        error: 'That phone number has been used by another User',
      });
    } else {
      return next();
    }
  });
};

export default userCheckByPhone;
