import { Router } from 'express';
import { Cart } from '../models/Cart.js';
import { Order } from '../models/Order.js';

export const ordersRouter = Router();

// Place an order from a cart
ordersRouter.post('/orders', async (req, res) => {
  const { cartId, customer = {} } = req.body || {};
  if (!cartId) return res.status(400).json({ message: 'cartId is required' });
  const cart = await Cart.findById(cartId).lean();
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  const items = (cart.items || []).filter((it) => it.qty > 0);
  if (items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

  const total = items.reduce((sum, it) => sum + Number(it.price) * Number(it.qty), 0);
  const order = await Order.create({
    cartId,
    items,
    total,
    customer: {
      name: String(customer.name || ''),
      email: String(customer.email || '')
    }
  });

  // Mark cart as ordered (optional) and clear items
  await Cart.findByIdAndUpdate(cartId, { status: 'ordered', items: [] });

  res.status(201).json({ orderId: String(order._id), total });
});
