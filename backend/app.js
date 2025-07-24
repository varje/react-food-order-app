import fs from 'node:fs/promises';
import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ CORS middleware (GitHub Pages frontend)
app.use(cors({
  origin: 'https://varje.github.io',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// ✅ Middleware
app.use(bodyParser.json());

// ✅ API ROUTES
app.get('/api/meals', async (req, res) => {
  try {
    const meals = await fs.readFile('./data/available-meals.json', 'utf8');
    res.json(JSON.parse(meals));
  } catch (err) {
    res.status(500).json({ message: 'Failed to load meals.' });
  }
});

app.post('/api/orders', async (req, res) => {
  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: 'Missing order items.' });
  }

  const { email, name, street, city, ['postal-code']: postalCode } = orderData.customer;

  if (
    !email || !email.includes('@') ||
    !name || name.trim() === '' ||
    !street || street.trim() === '' ||
    !postalCode || postalCode.trim() === '' ||
    !city || city.trim() === ''
  ) {
    return res.status(400).json({ message: 'Missing customer data.' });
  }

  const newOrder = {
    ...orderData,
    id: Math.random().toString(),
  };

  try {
    const orders = await fs.readFile('./data/orders.json', 'utf8');
    const allOrders = JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders, null, 2));
    res.status(201).json({ message: 'Order created!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save order.' });
  }
});

// ✅ Serve frontend (optional for local or Railway frontend fallback)
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
