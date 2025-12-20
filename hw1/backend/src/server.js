import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { connectToMongo } from './db/connect.js';
import { healthRouter } from './routes/health.js';
import { menuRouter } from './routes/menu.js';
import { cartRouter } from './routes/cart.js';
import { ordersRouter } from './routes/orders.js';

dotenv.config();

const PORT = Number(process.env.PORT || 5001);
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

const app = express();

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// API routes
app.use('/api', healthRouter);
app.use('/api', menuRouter);
app.use('/api', cartRouter);
app.use('/api', ordersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

async function start() {
  await connectToMongo(process.env.MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

start().catch((e) => {
  console.error('Failed to start server:', e.message);
  process.exit(1);
});
