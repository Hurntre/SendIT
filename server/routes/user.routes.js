import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { verifyToken } = middlewares;

const {
  userController: { getAllParcelsByUser },
} = controllers;

const userRoute = express.Router();

userRoute.get('/:userID/parcels', verifyToken, getAllParcelsByUser);

export default userRoute;
