import { Router } from 'express';
import authRoute from './auth.routes';
import parcelRoute from './parcel.routes';
import userRoute from './user.routes';

const router = Router();

router.use('/auth', authRoute);
router.use('/parcels', parcelRoute);
router.use('/users', userRoute);

export default router;
