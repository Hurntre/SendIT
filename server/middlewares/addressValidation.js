import googleMaps from '@google/maps';
/**
 * @method verifyReceiverAddress
 * @description Verifies the receiver address provided by the user
 * @param {*} req
 * @param {*} res
 * @returns {*} - JSON response object
 */
const env = process.env.NODE_ENV;
const verifyReceiverAddress = (req, res, next) => {
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
    const googleMapsClient = googleMaps.createClient({
      key: process.env.googleAPI,
      Promise,
    });

    googleMapsClient
      .places({
        query: receiverAddress,
      })
      .asPromise()
      .then(response => {
        if (response.json.results.length > 0) {
          next();
        } else {
          return res.status(404).json({
            success: false,
            error: 'Address not found, enter a valid address',
          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          success: false,
          error: err,
        });
      });
  }
};

export default verifyReceiverAddress;
