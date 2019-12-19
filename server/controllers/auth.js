import UserModel from '../db/models/user';

const signUpController = (req, res) => {
  const { body } = req;
  UserModel.create(body, (error, data) => {
    if (error) {
      res.status(400).send({
        success: false,
        error,
      });
    } else {
      res.json({
        success: true,
        data,
      });
    }
  });
};

const authController = {
  signUpController,
};

export default authController;
