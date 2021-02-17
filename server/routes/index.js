import express from 'express';

// auth Routes
import authRoute from './auth.routes';

// parcel Routes
import parcelRoute from './parcel.routes';

// user Routes
import userRoute from './user.routes';

// express router
const router = express.Router();

router.use('/auth', authRoute);
router.use('/parcels', parcelRoute);
router.use('/users', userRoute);

export default router;
