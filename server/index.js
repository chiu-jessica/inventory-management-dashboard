const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory inventory (resets when the server restarts)
let inventory = [
  { id: 1, name: 'Arduino Kit', category: 'Hardware', quantity: 5, status: 'Available' },
  { id: 2, name: 'Figma License', category: 'Software', quantity: 20, status: 'Available' }
];

// GET /inventory - return all items
app.get('/inventory', (req, res) => {
  res.json(inventory);
});

// POST /inventory - add a new item
app.post('/inventory', (req, res) => {
  const { name, category, quantity, status } = req.body;

  if (!name || !category || typeof quantity !== 'number' || !status) {
    return res.status(400).json({ error: 'Invalid item. Required: name, category, quantity (number), status' });
  }

  const nextId = inventory.length ? Math.max(...inventory.map(i => i.id)) + 1 : 1;
  const newItem = { id: nextId, name, category, quantity, status };
  inventory.push(newItem);

  res.status(201).json(newItem);
});

// Basic health check
app.get('/', (req, res) => {
  res.send('Inventory server is running');
});

app.listen(PORT, () => {
  console.log(`Inventory server listening on http://localhost:${PORT}`);
});
