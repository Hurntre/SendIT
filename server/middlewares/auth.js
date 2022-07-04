import validations from '../helpers/validations';

/**
 * @method auth
 * @description Verifies the token provided by the user
 * @param {*} req
 * @param {*} res
 * @returns {*} - JSON response object
 */

const auth = (req, res, next) => {
  const payload = validations.verifyAuthHeader(req);

  let error;
  let status;
  if (!payload || payload.error === 'error') {
    status = 401;
    error = 'You are not authorized';
  }
  if (payload.error === 'Invalid token') {
    status = 403;
    error = 'Forbidden';
  }

  if (error) {
    return res.status(status).json({
      errors: {
        body: [error],
      },
    });
  }
  req.user = payload;
  return next();
};

export default auth;
