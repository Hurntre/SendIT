import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { verifyToken, newParcelMiddlewares } = middlewares;

const parcelRoute = express.Router();

const {
  parcelController: { getAllParcel, createParcel },
} = controllers;

const { newParcelValidation, bodyFillers } = newParcelMiddlewares;

parcelRoute.get('/parcels', verifyToken, getAllParcel);

parcelRoute.post(
  '/parcels',
  verifyToken,
  bodyFillers,
  newParcelValidation,
  createParcel
);

export default parcelRoute;
