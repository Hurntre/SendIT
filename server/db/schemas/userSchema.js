import mongoose from 'mongoose';

// USER SCHEMA
const userSchema = new mongoose.Schema({
  token: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
});

export default userSchema;
