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
      description: 'A White stockie Esbee footwear',
      weight: 1.15,
      pickUpDate: Date.now() + 1,
      expectedDeliveryDate: Date.now() + 8,
      pickUpLocation: 'Abuja',
      status: 'Pickup Pending',
      receiverName: 'Adefolaju Ariyo',
      receiverPhoneNumber: '08140159932',
      receiverAddress: 'your house number, street, area, town, city, state.',
    },
    {
      description: 'An Agbajo Irele footwear size 47',
      weight: 0.75,
      pickUpDate: Date.now() + 1,
      expectedDeliveryDate: Date.now() + 8,
      status: 'Delivered',
      pickUpLocation: 'Abuja',
      receiverName: 'Adefolaju Ariyo',
      receiverPhoneNumber: '08140159932',
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
