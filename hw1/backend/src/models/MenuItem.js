import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

export const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);
