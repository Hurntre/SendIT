/**
 * @method verifyToken
 * @description Verifies the token provided by the user
 * @param {*} req
 * @param {*} res
 * @returns {*} - JSON response object
 */

const verifyPickUpDate = (req, res, next) => {
  const {
    body: { pickUpDate },
  } = req;

  const presentDate = Date.now();
  const timeDifference = pickUpDate - presentDate;
  const requiredTimeDifference = 86400000;

  if (timeDifference < requiredTimeDifference) {
    return res.status(400).json({
      success: false,
      error: 'pickup date has to be at least a day from now',
    });
  }
  return next();
};

export default verifyPickUpDate;
