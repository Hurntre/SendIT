import UserModel from '../db/models/user';

const signUpController = (req, res) => {
  const newUser = req.body;

  UserModel.create(newUser, (err, newUserCreated) => {
    if (err) {
      res.send(err);
    } else {
      res.send(`${newUserCreated}  Successfully created`);
    }
  });
};

const authController = {
  signUpController,
};

export default authController;
