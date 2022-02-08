import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const {
  verifyToken,
  newParcelValidation,
  verifyPickUpDate,
  verifyReceiverAddress,
  deliveryDateSetter,
} = middlewares;

const parcelRoute = express.Router();

const {
  parcelController: { getAllParcel, createParcel, getParcelByID },
} = controllers;

parcelRoute.get('/', verifyToken, getAllParcel);
parcelRoute.post(
  '/',
  verifyToken,
  deliveryDateSetter,
  newParcelValidation,
  verifyPickUpDate,
  verifyReceiverAddress,
  createParcel
);
parcelRoute.get('/:parcelID', verifyToken, getParcelByID);
export default parcelRoute;
