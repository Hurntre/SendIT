/* eslint-disable require-jsdoc */
import UserModel from '../db/models/user';
import authHelper from '../helpers/auth';

/**
 *  @class UserController
 */

export default class UserController {
  /**
   * @method registerUser
   * @description registers a user with their email
   * @param {*} req
   * @param {*} res
   * @returns {object} registered user
   */
  static async signUpController(req, res) {
    const { body } = req;

    const userEmail = body.email;
    body.email = userEmail.toLowerCase();

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
}
