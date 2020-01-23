import UserModel from '../db/models/user';
import tokenGenerator from '../helpers/userToken';
import authHelper from '../helpers/auth';
import emailSender from '../helpers/emailService';
import resetMailOptions from '../helpers/notificationService';

const resetUrl = process.env.RESET_URL;

const signUpController = async (req, res) => {
  const { body } = req;
  try {
    UserModel.create(body, (err, data) => {
      const { _id, email } = data;
      const token = tokenGenerator.userToken({ _id, email });

      res.status(200).json({
        success: true,
        token,
        data,
      });
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error,
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email,
  });
  if (!user) {
    return res.status(400).send({
      success: false,
      error: 'The email address is not associated with any account',
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

const passwordResetRequest = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({
      email,
    });
    if (!user) {
      return res.status(400).send({
        success: false,
        error: `Email not found`,
      });
    }
    const { _id } = user;
    const token = tokenGenerator.userToken({ _id, email });
    const link = `${resetUrl}/${token}`;

    await UserModel.findByIdAndUpdate(
      { _id },
      { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 },
      { useFindAndModify: false }
    );
    emailSender(resetMailOptions(email, user.firstName, link));
    return res.status(200).send({
      success: true,
      data: {
        message: `A reset email has been sent to ${user.email}.`,
        token,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error,
    });
  }
};
// @route GET api/v1/auth/reset/:token
// @desc validate password reset token  and sends a result on success or not
const passwordResetPageRequest = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).send({
        success: false,
        error: 'Password reset token is invalid or has expired',
      });
    }
    return res.status(200).send({
      success: true,
      message: 'this is the password reset page',
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error,
    });
  }
};

// @route POST api/v1/auth/reset/:token
// @desc reset password
const updatePassword = async (req, res) => {
  const user = await UserModel.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).send({
      success: false,
      error: 'Password reset token is invalid or has expired',
    });
  }
  const hashedPassword = authHelper.hashPassword(req.body.password);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  try {
    user.save(() => {
      return res.status(200).send({
        success: true,
        message: 'password successfully reset',
        user,
      });
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error,
    });
  }
};

const authController = {
  signUpController,
  loginController,
  passwordResetRequest,
  passwordResetPageRequest,
  updatePassword,
};

export default authController;
