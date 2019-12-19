import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const authHelper = {
  hashPassword: password => {
    return bcrypt.hashSync(password, 10);
  },
  comparePassword: (hashPassword, password) => {
    return bcrypt.compareSync(password, hashPassword);
  },
};

export default authHelper;
