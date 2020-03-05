import express from 'express';

// auth Routes
import authRoute from './auth.routes';

// parcel Routes
import parcelRoute from './parcel.routes';

// express router
const router = express.Router();

router.use('/auth', authRoute);
router.use('/parcel', parcelRoute);

export default router;
