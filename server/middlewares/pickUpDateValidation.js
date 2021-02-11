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

  if (timeDifference < 86400000) {
    return res.status(400).json({
      success: false,
      error: 'pickUpdate date has to be to a day from now at least',
    });
  }
  return next();
};

export default verifyPickUpDate;
