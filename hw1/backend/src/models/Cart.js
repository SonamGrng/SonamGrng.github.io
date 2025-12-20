import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    items: { type: [CartItemSchema], default: [] },
    status: { type: String, enum: ['active', 'ordered'], default: 'active' }
  },
  { timestamps: true }
);

export const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
