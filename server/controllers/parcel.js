import ParcelModel from '../db/models/parcel';

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
}
