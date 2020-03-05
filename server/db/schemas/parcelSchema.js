import mongoose from 'mongoose';

const { Schema } = mongoose;

// parcel SCHEMA
const parcelSchema = new Schema({
  description: { type: String, required: true },
  status: { type: String, default: 'pending' },
  weight: { type: Number, required: true },
  pickUpDate: { type: Date, required: true },
  expectedDeliveryDate: { type: Date, required: false },
  dateDelivered: { type: String, required: false },
  pickUpLocation: { type: String, required: false },
  receiverName: { type: String, required: true },
  receiverPhoneNumber: { type: Number, required: true },
  receiverAddress: { type: String, required: true },
});

export default parcelSchema;
