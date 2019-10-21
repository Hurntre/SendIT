import mongoose from 'mongoose';

// USER SCHEMA
const userSchema = new mongoose.Schema({
  name: { firstName: String, lastName: String },
  email: String,
  phoneNumber: String,
  password: String,
});

export default userSchema;
