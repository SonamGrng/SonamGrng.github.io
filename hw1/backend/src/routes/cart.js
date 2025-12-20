import { Router } from 'express';
import { Cart } from '../models/Cart.js';

export const cartRouter = Router();

// Create a cart and return cartId
cartRouter.post('/cart', async (req, res) => {
  const cart = await Cart.create({ items: [] });
  res.status(201).json({ cartId: String(cart._id), items: [] });
});

// Load cart by id
cartRouter.get('/cart/:cartId', async (req, res) => {
  const cart = await Cart.findById(req.params.cartId).lean();
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  res.json({ cartId: String(cart._id), items: cart.items || [] });
});

// Replace cart items
cartRouter.put('/cart/:cartId', async (req, res) => {
  const { items } = req.body || {};
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: 'items must be an array' });
  }
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  cart.items = items
    .map((it) => ({
      itemId: it.itemId || undefined,
      name: String(it.name || ''),
      price: Number(it.price || 0),
      qty: Math.max(0, Math.floor(Number(it.qty || 0)))
    }))
    .filter((it) => it.name && it.qty > 0);
  await cart.save();
  res.json({ ok: true });
});

// Clear cart
cartRouter.delete('/cart/:cartId', async (req, res) => {
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  cart.items = [];
  await cart.save();
  res.json({ ok: true });
});
