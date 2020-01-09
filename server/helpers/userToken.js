import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRETKEY;

const tokenGenerator = {
  userToken: user => {
    return jwt.sign({ user }, secretKey);
  },
};

export default tokenGenerator;
