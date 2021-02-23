/* eslint-disable func-names */
import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema';
import authHelper from '../../helpers/auth';

userSchema.pre('validate', async function hashIt() {
  if (this.isNew) {
    const hashedPassword = await authHelper.hashPassword(this.password);
    this.password = hashedPassword;
  }
});

// to prevent the printing of a user's password and parcels
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.parcels;
  return userObject;
};

// to allow findOneOrCreate

userSchema.statics.findOneOrCreate = function findOneOrCreate(
  condition,
  doc,
  callback1,
  callback2
) {
  const self = this;
  self.findOne(condition, (err, existingUserObject) => {
    return existingUserObject
      ? callback1(err, existingUserObject)
      : self.create(doc, (err, newUserObject) => {
          return callback2(err, newUserObject);
        });
  });
};

// USER MODEL
const User = mongoose.model('User', userSchema);

export default User;
