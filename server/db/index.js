import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
const MONGO_URI = process.env.MONGODB_URL;
const TEST_MONGO_URI = process.env.TEST_MONGODB_URL;

// TODO: Refactor new Promise to use tryCatch if possible

const connect = () =>
  new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      mongoose
        .connect(TEST_MONGO_URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    } else {
      mongoose
        .connect(MONGO_URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
  });

const close = () => mongoose.disconnect();

module.exports = { connect, close };
