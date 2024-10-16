import { model, Schema } from 'mongoose';

const paymentSchema = new Schema(
  {
    user:Schema.Types.ObjectId,
    amount:Number,
    paymentType:String,
    transactionId:String,
    paymentStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

const Payment = model('Payment', paymentSchema);

export default Payment;
