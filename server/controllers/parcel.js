import ParcelModel from '../db/models/parcel';
import UserModel from '../db/models/user';

/**
 *  @class ParcelController
 */
export default class ParcelController {
  /**
   * @method getAllParcel
   * @description gets all created parcel from db
   * @param {*} req
   * @param {*} res
   * @returns {object} all parcel
   */

  static async getAllParcel(req, res) {
    try {
      const parcels = await ParcelModel.find({});
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

  /**
   * @method createParcel
   * @description create a new parcel and associate it with user
   * @param {*} req
   * @param {*} res
   * @returns {object} new parcel
   */

  static async createParcel(req, res) {
    const { _id, email } = req.user;
    const { body } = req;

    try {
      const foundUser = await UserModel.findOne({ email });
      // using a spread operator to spread the body into same object with senderID

      ParcelModel.create({ ...body, senderID: _id }).then(async parcel => {
        foundUser.parcels.push(parcel);
        await foundUser.save();

        res.status(200).send({
          success: true,
          parcel,
          message: 'new parcel created successfully',
        });
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error,
      });
    }
  }

  static async getParcelByID(req, res) {
    try {
      const id = req.params.parcelID;
      const parcel = await ParcelModel.findOne({ _id: id });
      if (!parcel) {
        return res.status(404).send({
          success: false,
          error: 'No parcel with such ID exists in DB',
        });
      }

      return res.status(200).send({
        success: true,
        message: 'Parcel retrieved successfully',
        parcel,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        error,
      });
    }
  }
}
