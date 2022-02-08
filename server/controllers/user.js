/* eslint-disable require-jsdoc */
import ParcelModel from '../db/models/parcel';
// import UserModel from '../db/models/user';

/**
 *  @class UserController
 */

export default class UserController {
  /**
   * @method getAllParcel
   * @description gets all created parcel from db
   * @param {*} req
   * @param {*} res
   * @returns {object} all parcel
   */

  static async getAllParcelsByUser(req, res) {
    const { userID } = req.params;

    try {
      const parcels = await ParcelModel.find({ senderID: userID });
      if (!parcels) {
        return res.status(400).send({
          success: false,
          error: 'No parcel exists in db',
        });
      }

      return res.status(200).send({
        success: true,
        message: 'All parcels retrieved successfully',
        parcels,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error,
      });
    }
  }
}
