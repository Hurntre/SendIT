import mongoose from 'mongoose';

import { Mockgoose } from 'mockgoose';

const DB_URI = 'mongodb://localhost:27017/myapp';

const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage().then(() => {
        mongoose
          .connect(DB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
          })
          .then((res, err) => {
            if (err) return reject(err);
            resolve();
          });
      });
    } else {
      mongoose
        .connect(DB_URI, {
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
};

const close = () => {
  return mongoose.disconnect();
};

module.exports = { connect, close };
