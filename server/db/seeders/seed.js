import UserModel from '../models/user';

const seeds = async () => {
  await UserModel.deleteMany({});
};

export default seeds;
