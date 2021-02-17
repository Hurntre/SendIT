import mongoose from 'mongoose';

const { Schema } = mongoose;

// parcel SCHEMA
const parcelSchema = new Schema({
  description: { type: String, required: true },
  status: { type: String, default: 'Requested' },
  weight: { type: Number, required: true },
  pickUpDate: { type: Date, required: true },
  expectedDeliveryDate: { type: Date, required: true },
  dateDelivered: { type: String, required: false },
  senderID: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
  pickUpAddress: { type: String, required: true },
  receiverName: { type: String, required: true },
  receiverPhoneNumber: { type: Number, required: true },
  receiverAddress: { type: String, required: true },
});

export default parcelSchema;
