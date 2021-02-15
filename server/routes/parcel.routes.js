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
  parcelController: { getAllParcel, createParcel },
} = controllers;

parcelRoute.get('/', verifyToken, getAllParcel);
parcelRoute.post(
  '/',
  verifyToken,
  newParcelValidation,
  verifyPickUpDate,
  verifyReceiverAddress,
  deliveryDateSetter,
  createParcel
);

export default parcelRoute;
