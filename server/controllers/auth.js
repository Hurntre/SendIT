import UserModel from '../db/models/user';

const signUpController = (req, res) => {
  const { User } = req.body;

  UserModel.create(User, err => {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/login.html');
    }
  });
};

const authController = {
  signUpController,
};

export default authController;
