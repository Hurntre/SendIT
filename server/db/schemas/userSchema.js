import mongoose from 'mongoose';

const { Schema } = mongoose;

// USER SCHEMA
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  password: { type: String, required: true },
  socialID: { type: String, required: false },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default userSchema;
