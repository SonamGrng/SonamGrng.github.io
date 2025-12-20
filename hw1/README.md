# Tastys Restaurant (React + Express + MongoDB)

This project is a simple, functional restaurant web app with:

**Frontend**: React (Vite) + Bootstrap

**Backend**: Node.js + Express + MongoDB (Mongoose)

## Features (Assignment Requirements)

- **Menu Management (MongoDB)**: Menu items are stored in MongoDB and loaded by the React frontend via REST API.
- **Cart Updates (MongoDB)**: A cart is created in MongoDB and updated as quantities change.
- **Order Processing (MongoDB)**: Placing an order saves an `Order` document and clears the cart.

## Run Locally

### 1) Install

From the project root:

```bash
npm install
```

> `postinstall` automatically installs backend dependencies.

### 2) Configure backend env

Create `backend/.env`:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and set your MongoDB URI:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/tastys
PORT=5001
CORS_ORIGIN=http://localhost:5173
```

> macOS often reserves port `5000`, so the backend defaults to `5001`.

### 3) Seed the menu (one time)

```bash
npm run seed
```

### 4) Start frontend + backend

```bash
npm run dev:full
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5001/api/health

## API Endpoints

- `GET /api/menu` - returns menu grouped by category
- `POST /api/cart` - create a cart
- `GET /api/cart/:cartId` - load cart
- `PUT /api/cart/:cartId` - replace cart items
- `DELETE /api/cart/:cartId` - clear cart
- `POST /api/orders` - place order (saves to DB)

## Deployment (Suggested)

- Deploy the **backend** to Render/Railway/Fly.io and set `MONGODB_URI` in environment variables.
- Deploy the **frontend** to Vercel/Netlify.
- Update `CORS_ORIGIN` on the backend to your deployed frontend URL.
