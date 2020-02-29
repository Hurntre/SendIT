import UserModel from '../models/user';

const usersDeleteSeed = async () => {
  await UserModel.deleteMany({});
};

const userCreateSeed = async () => {
  await UserModel.insertMany(
    {
      firstName: 'Nigeria',
      lastName: 'Lagos',
      email: 'email56@yahoo.com',
      phoneNumber: '08012345678',
      password: 'pAsSwOrD',
      confirmPassword: 'pAsSwOrD',
    },
    {
      firstName: 'Adamawa',
      lastName: 'Yola',
      email: 'admin@yahoo.com',
      phoneNumber: '08012345670',
      password: 'pAsSwOrD',
      confirmPassword: 'pAsSwOrD',
      isAdmin: 'true',
    }
  );
};

const seeds = {
  usersDeleteSeed,
  userCreateSeed,
};

export default seeds;
