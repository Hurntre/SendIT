import Authenticate from './auth';

const verifyAuthHeader = req => {
  try {
    if (!req.headers.authorization) {
      return { error: 'error' };
    }
    const token = req.headers.authorization.split(' ')[1];
    const payload = Authenticate.decode(token);

    return payload;
  } catch (err) {
    return { error: 'Invalid token' };
  }
};

const validations = {
  verifyAuthHeader,
};

export default validations;
