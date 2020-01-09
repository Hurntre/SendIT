import UserModel from '../db/models/user';
import tokenGenerator from '../helpers/userToken';

const signUpController = (req, res) => {
  const { body } = req;
  const { id, email } = req;
  const token = tokenGenerator.userToken({ id, email });
  UserModel.create(body, (error, data) => {
    if (error) {
      res.status(400).send({
        success: false,
        error,
      });
    }

    res.json({
      success: true,
      token,
      data,
    });
  });
};

const authController = {
  signUpController,
};

export default authController;
