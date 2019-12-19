import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema';
import authHelper from '../../helpers/auth';
import tokenGenerator from '../../helpers/userToken';

// eslint-disable-next-line func-names
userSchema.pre('validate', async function() {
  if (this.isNew) {
    const hashedPassword = await authHelper.hashPassword(this.password);
    this.password = hashedPassword;

    this.token = tokenGenerator.userToken(this);
  }
});

// USER MODEL
const User = mongoose.model('User', userSchema);

export default User;
