import UserModel from '../db/models/user';
import tokenGenerator from '../helpers/userToken';
import authHelper from '../helpers/auth';

const signUpController = (req, res) => {
  const { body } = req;
  UserModel.create(body, (error, data) => {
    if (error) {
      res.status(400).send({
        success: false,
        error,
      });
    }

    const { _id, email } = data;
    const token = tokenGenerator.userToken({ _id, email });

    res.status(200).json({
      success: true,
      token,
      data,
    });
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email,
  });
  if (!user) {
    return res.status(400).send({
      success: false,
      error: 'No registered user with that email',
    });
  }

  const verifyPassword = authHelper.comparePassword(user.password, password);

  if (!verifyPassword) {
    return res.status(400).send({
      success: false,
      error: 'Invalid password',
    });
  }

  const { _id } = user;
  const token = tokenGenerator.userToken({ _id, email });

  return res.status(200).json({
    success: true,
    token,
    user,
  });
};

const authController = {
  signUpController,
  loginController,
};

export default authController;
