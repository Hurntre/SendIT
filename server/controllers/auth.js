/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
import UserModel from '../db/models/user';
import authHelper from '../helpers/auth';
import emailSender from '../config/emailService';
import resetMailOptions from '../helpers/notificationService';

const resetUrl = process.env.RESET_URL;

// TODO: add js docs for each method

/**
 * @class AuthController
 */
export default class AuthController {
  /**
   * @method registerUser
   * @description registers a user with their email
   * @param {*} req
   * @param {*} res
   * @returns {object} registered user
   */
  static async signUpController(req, res) {
    const { body } = req;
    try {
      UserModel.create(body, (err, data) => {
        const { _id, email, isAdmin } = data;
        const token = authHelper.encode({ _id, email, isAdmin });

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
  }

  static async loginController(req, res) {
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

    const { _id, isAdmin } = user;
    const token = authHelper.encode({ _id, email, isAdmin });

    return res.status(200).json({
      success: true,
      token,
      user,
    });
  }

  static async passwordResetRequest(req, res) {
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
      const token = authHelper.encode({ _id, email });
      const link = `${resetUrl}/${token}`;

      await UserModel.findByIdAndUpdate(
        { _id },
        {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000,
        },
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
  }

  // @route GET api/v1/auth/reset/:token
  // @desc validate password reset token  and sends a result on success or not
  static async passwordResetPageRequest(req, res) {
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
  }

  // @route POST api/v1/auth/reset/:token
  // @desc reset password
  static async updatePassword(req, res) {
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
  }

  static async socialRedirect(req, res) {
    const { firstName, lastName } = req.user;
    return res.status(200).json({
      success: true,
      message: `Social user ${firstName} ${lastName} is logged in`,
    });
  }

  static async googlePassportCallback(
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    const {
      name: { givenName, familyName },
      id,
      emails,
    } = profile;

    UserModel.findOneOrCreate(
      { email: emails[0].value },
      {
        firstName: givenName,
        lastName: familyName,
        email: emails[0].value,
        password: id,
        socialID: id,
      },
      (err, existingUser) => {
        console.log(`user is: ${existingUser}`);
        done(null, existingUser);
      },
      (err, newUser) => {
        console.log(`new user created: ${newUser}`);
        done(null, newUser);
      }
    );
  }

  static async githubPassportCallback(
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    const { id, emails, displayName } = profile;

    const name = displayName.split(' ');
    UserModel.findOneOrCreate(
      { socialID: id },
      {
        firstName: name[0],
        lastName: name[1],
        email: emails[0].value,
        password: id,
        socialID: id,
      },
      (err, existingUser) => {
        console.log(`user is: ${existingUser}`);
        done(null, existingUser);
      },
      (err, newUser) => {
        console.log(`new user created: ${newUser}`);
        done(null, newUser);
      }
    );
  }
}
