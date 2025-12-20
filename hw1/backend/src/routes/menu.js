import { Router } from 'express';
import { MenuItem } from '../models/MenuItem.js';

export const menuRouter = Router();

// Public: list menu items (grouped by category for convenience)
menuRouter.get('/menu', async (req, res) => {
  const items = await MenuItem.find({}).sort({ category: 1, name: 1 }).lean();
  const categories = {};
  for (const it of items) {
    const cat = it.category || 'Other';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push({
      _id: String(it._id),
      name: it.name,
      description: it.description,
      price: it.price,
      category: it.category,
      imageUrl: it.imageUrl
    });
  }
  res.json({ categories });
});

// Minimal admin endpoints (optional for rubric "menu changes persisted")
menuRouter.post('/menu', async (req, res) => {
  const { name, description = '', price, category, imageUrl = '' } = req.body || {};
  if (!name || price === undefined || !category) {
    return res.status(400).json({ message: 'name, price, category are required' });
  }
  const created = await MenuItem.create({ name, description, price, category, imageUrl });
  res.status(201).json({ _id: String(created._id) });
});

menuRouter.put('/menu/:id', async (req, res) => {
  const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body || {}, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
});

menuRouter.delete('/menu/:id', async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});
