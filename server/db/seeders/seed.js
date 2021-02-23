import UserModel from '../models/user';
import ParcelModel from '../models/parcel';

const usersDeleteSeed = async () => {
  await UserModel.deleteMany({});
};

const userCreateSeed = async () => {
  await UserModel.insertMany([
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
    },
  ]);
};

const parcelDeleteSeed = async () => {
  await ParcelModel.deleteMany({});
};

const parcelCreateSeed = async () => {
  await ParcelModel.insertMany([
    {
      description: 'A White Nike Airforce 1',
      weight: 1.15,
      pickUpDate: new Date(Date.now() + 86400000),
      expectedDeliveryDate: Date.now() + 6912000000,
      pickUpAddress: 'No 5, National Stadium Crescent, Abuja town, Florida',
      status: 'requested',
      receiverName: 'Paul Smith',
      receiverPhoneNumber: '08111111111',
      receiverAddress: 'your house number, street, area, town, city, state.',
    },
    {
      description: 'An Agbajo Irele footwear size 47',
      weight: 0.75,
      pickUpDate: new Date(Date.now() + 86400000),
      expectedDeliveryDate: Date.now() + 6912000000,
      status: 'Delivered',
      pickUpAddress:
        'No 99, middle of nowhere street, ghost town, no state, lost country',
      receiverName: 'John Doe',
      receiverPhoneNumber: '02222222222',
      receiverAddress: 'your house number, street, area, town, city, state.',
    },
  ]);
};
const seeds = {
  usersDeleteSeed,
  userCreateSeed,
  parcelCreateSeed,
  parcelDeleteSeed,
};

export default seeds;
