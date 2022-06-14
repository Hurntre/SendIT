import { Router } from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const router = Router();

const {
  auth,
  newParcelValidation,
  verifyPickUpDate,
  verifyReceiverAddress,
  deliveryDateSetter,
} = middlewares;

const {
  parcelController: {
    getAllParcel,
    createParcel,
    getParcelByID,
    getParcelsByUserID,
  },
} = controllers;

/**
 * @route GET api/v1/parcels
 * @description Get all parcels
 * @access Public
 */

// I should make this route private for the admin dashboard
// add pagination and caching
router.get('/', auth, getAllParcel);

/**
 * @route POST api/v1/parcels
 * @description Create a parcel
 * @access Private
 */
router.post(
  '/',
  auth,
  deliveryDateSetter,
  newParcelValidation,
  verifyPickUpDate,
  verifyReceiverAddress,
  createParcel
);

/**
 * @route GET api/v1/parcels/:parcelID
 * @description Get a single parcel by ID
 * @access Private
 */
router.get('/:parcelID', auth, getParcelByID);

/**
 * @route GET api/v1/parcels/user/:userID
 * @description Get all parcels created by a single user
 * @access Private
 */
router.get('/user/:userID', auth, getParcelsByUserID);

export default router;
