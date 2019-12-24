import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const authHelper = {
  hashPassword: password => {
    return bcrypt.hashSync(password, 10);
  },
  comparePassword: (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
  },
};

export default authHelper;
