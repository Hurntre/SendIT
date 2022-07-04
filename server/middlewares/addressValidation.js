import geocoder from '../helpers/geocoder';
/**
 * @method verifyReceiverAddress
 * @description Verifies the receiver address provided by the user
 * @param {*} req
 * @param {*} res
 * @returns {*} - JSON response object
 */
const env = process.env.NODE_ENV;
const googleAPIkey = process.env.GOOGLE_API_KEY;

const verifyReceiverAddress = async (req, res, next) => {
  const { receiverAddress } = req.body;

  try {
    if (env === 'test') {
      return next();
    }

    const results = await geocoder(receiverAddress, googleAPIkey);

    if (results.status === 'invalid address') {
      return res.status(404).json({
        success: false,
        error: 'Invalid address',
      });
    }

    req.body.formattedReceiverAddress = results[0].formatted_address;
    req.body.formattedReceiverAddressLAT = results[0].geometry.location.lat;
    req.body.formattedReceiverAddressLNG = results[0].geometry.location.lng;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export default verifyReceiverAddress;
