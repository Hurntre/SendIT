import UserModel from '../models/user';

const usersDeleteSeed = async () => {
  await UserModel.deleteMany({});
};

const userCreateSeed = async () => {
  await UserModel.create({
    firstName: 'Nigeria',
    lastName: 'Lagos',
    email: 'email56@yahoo.com',
    phoneNumber: '08012345678',
    password: 'pAsSwOrD',
    confirmPassword: 'pAsSwOrD',
  });
};

const seeds = {
  usersDeleteSeed,
  userCreateSeed,
};

export default seeds;
