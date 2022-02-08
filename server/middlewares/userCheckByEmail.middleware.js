import UserModel from '../db/models/user';

const userCheckByEmail = (req, res, next) => {
  const userEmail = req.body.email;
  UserModel.find({ email: userEmail }, (error, userFoundByEmail) => {
    if (userFoundByEmail.length >= 1) {
      res.status(400).send({
        success: false,
        error: 'That email has been used by another User',
      });
    } else {
      return next();
    }
  });
};

export default userCheckByEmail;
