import mongoose from 'mongoose';
import parcelSchema from '../schemas/parcelSchema';

// PARCEL MODEL
const Parcel = mongoose.model('Parcel', parcelSchema);

export default Parcel;
