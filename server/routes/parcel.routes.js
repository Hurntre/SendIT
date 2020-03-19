import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { verifyToken } = middlewares;

const parcelRoute = express.Router();

const {
  parcelController: { getAllParcel },
} = controllers;

parcelRoute.get('/parcels', verifyToken, getAllParcel);

export default parcelRoute;
