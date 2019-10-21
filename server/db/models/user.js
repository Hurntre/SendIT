import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema';

// USER MODEL
const User = mongoose.model('User', userSchema);

export default User;