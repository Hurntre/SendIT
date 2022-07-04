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
   * @method loginUser
   * @description logs in a user with their email and password
   * @param {*} req
   * @param {*} res
   * @returns {object} logged in user without parcel property
   */
  static async loginController(req, res) {
    const { email, password } = req.body;
    const convertedEmail = email.toLowerCase();
    const user = await UserModel.findOne({
      email: convertedEmail,
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

  /**
   * @method passwordResetRequest
   * @description creates unique password reset link using user id and email to create token
   * @param {*} req
   * @param {*} res
   * @returns {object} token created
   */
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

  /**
   * @method passwordResetPageRequest
   * @description validate password reset token  and sends a result on success or not
   * @param {*} req
   * @param {*} res
   * @route GET api/v1/auth/reset/:token
   * @returns {object} success message
   */
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

  /**
   * @method updatePassword
   * @description validate password reset token and updates user password with hashed new password. then sets the token property to undefined
   * @param {*} req
   * @param {*} res
   * @route POST api/v1/auth/reset/:token
   * @returns {object} user with hashed updated password
   */
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

  /**
   * @method socialRedirect
   * @description resolves the social login route.
   * @param {*} req
   * @param {*} res
   * @returns {object} success message with social user firstname and lastname
   */
  static async socialRedirect(req, res) {
    const { firstName, lastName } = req.user;
    return res.status(200).json({
      success: true,
      message: `Social user ${firstName} ${lastName} is logged in`,
    });
  }

  /**
   * @method googlePassportCallback
   * @description checks if google user exists in app or not. create new user if not
   * @param {*} accessToken
   * @param {*} refreshToken
   * @param {*} profile
   * @param {*} done
   * @returns {Promise} a done function that accepts null and user object
   */
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

  /**
   * @method githubPassportCallback
   * @description checks if githubuser exists in app or not. create new user if not
   * @param {*} accessToken
   * @param {*} refreshToken
   * @param {*} profile
   * @param {*} done
   * @returns {Promise} a done function that accepts null and user object
   */
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
