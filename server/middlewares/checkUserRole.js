/**
 * @method checkUserType
 * @description prevents non admin users from accessing a specific route
 * @param {*} req
 * @param {*} res
 * @returns {*} - JSON response object
 */

const checkUserType = (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    return res.status(401).json({
      status: false,
      message: 'You are not allowed to access this endpoint',
    });
  }
  return next();
};

export default checkUserType;
