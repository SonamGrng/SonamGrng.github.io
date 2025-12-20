import dotenv from 'dotenv';
import { connectToMongo } from '../src/db/connect.js';
import { MenuItem } from '../src/models/MenuItem.js';

dotenv.config();

const seedItems = [
  {
    category: 'Sandwiches',
    name: 'The Tasty Classic (Signature Hero)',
    description: "grilled chicken, melted provolone, roasted peppers, and Tasty's creamy house sauce on a toasted hero",
    price: 13
  },
  {
    category: 'Sandwiches',
    name: 'Italian Combo',
    description: 'ham, salami, pepperoni, provolone, lettuce, tomato, oil & vinegar',
    price: 12
  },
  {
    category: 'Sandwiches',
    name: 'Turkey Avocado Club',
    description: 'roasted turkey, avocado spread, bacon, lettuce, tomato, and mayo',
    price: 11
  },
  {
    category: 'Sandwiches',
    name: 'Philly Cheesesteak',
    description: 'shaved steak, onions, peppers, and melted American cheese',
    price: 12
  },
  {
    category: 'Sandwiches',
    name: 'Buffalo Chicken Hero',
    description: 'crispy chicken tossed in buffalo sauce with lettuce and blue cheese',
    price: 11
  },
  {
    category: 'Sandwiches',
    name: 'Caprese Sandwich',
    description: 'fresh mozzarella, tomato, basil, and balsamic glaze',
    price: 9
  },
  {
    category: 'Sandwiches',
    name: 'Bacon Egg and Cheese',
    description: '',
    price: 8
  },
  {
    category: 'Sandwiches',
    name: 'Chopped Cheese',
    description: '',
    price: 8
  },
  {
    category: 'Beverages',
    name: 'Fresh Brewed Iced Coffee',
    description: '',
    price: 5
  },
  {
    category: 'Beverages',
    name: 'Hot Coffee',
    description: '',
    price: 3
  },
  {
    category: 'Beverages',
    name: 'Apple / Orange Juice',
    description: '',
    price: 3
  },
  {
    category: 'Beverages',
    name: 'Cold Brew',
    description: '',
    price: 6
  },
  {
    category: 'Beverages',
    name: 'Bottled Water / Soda',
    description: '',
    price: 2
  },
  {
    category: 'Snacks',
    name: 'Chocolate Muffin',
    description: '',
    price: 3
  },
  {
    category: 'Snacks',
    name: 'Chips (Assorted Flavors)',
    description: '',
    price: 2
  },
  {
    category: 'Snacks',
    name: 'Cookie (Chocolate Chip / Oatmeal)',
    description: '',
    price: 2
  },
  {
    category: 'Snacks',
    name: 'Brownie',
    description: '',
    price: 3
  },
  {
    category: 'Snacks',
    name: 'Fruit Cup',
    description: '',
    price: 4
  }
];

async function main() {
  await connectToMongo(process.env.MONGODB_URI);
  // Upsert by name so rerunning seed is safe.
  for (const item of seedItems) {
    await MenuItem.updateOne(
      { name: item.name },
      { $set: item },
      { upsert: true }
    );
  }
  const count = await MenuItem.countDocuments();
  console.log(`Seed complete. Menu items in DB: ${count}`);
  process.exit(0);
}

main().catch((e) => {
  console.error('Seed failed:', e);
  process.exit(1);
});
