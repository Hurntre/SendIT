import geocoder from '../helpers/geocoder';
/**
 * @method verifyReceiverAddress
 * @description Verifies the receiver address provided by the user
 * @param {*} req
 * @param {*} res
 * @returns {*} - JSON response object
 */
const env = process.env.NODE_ENV;
const googleAPIkey = process.env.GOOGLE_API;

const verifyReceiverAddress = async (req, res, next) => {
  const { receiverAddress } = req.body;

  if (env === 'test') {
    if (receiverAddress && receiverAddress.length > 4) {
      next();
    } else {
      return res.status(404).json({
        success: false,
        error: 'Invalid address',
      });
    }
  } else {
    try {
      const response = await geocoder(receiverAddress, googleAPIkey);

      if (response.data.results.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Invalid address',
        });
      }
      console.log(response.data.results);
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error,
      });
    }
  }
};

export default verifyReceiverAddress;
