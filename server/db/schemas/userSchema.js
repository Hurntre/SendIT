import mongoose from 'mongoose';

// USER SCHEMA
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

export default userSchema;
