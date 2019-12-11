import UserModel from '../db/models/user';

const signUpController = (req, res) => {
  const { User } = req.body;

  UserModel.create(User, (err, newUser) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    } else {
      // console.log(User);
      res.json({
        success: true,
        newUser,
      });
    }
  });
};

const authController = {
  signUpController,
};

export default authController;
