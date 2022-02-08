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
  const presentDate = new Date();
  // converted ISO formated date back to readable formated
  const newlyFormatedDate = new Date(pickUpDate);
  // get the total milliseconds in each day. This ensures we account for hour and minute the parcel is being created
  const timeDifference = newlyFormatedDate.getTime() - presentDate.getTime();

  // total milliseconds in a day
  const millisecondsInOneDay = 86400000;

  if (timeDifference < millisecondsInOneDay) {
    return res.status(400).json({
      success: false,
      error: 'pickup date has to be at least a day from now',
    });
  }
  return next();
};

export default verifyPickUpDate;
