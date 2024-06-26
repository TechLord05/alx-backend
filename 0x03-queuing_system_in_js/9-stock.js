import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

// List of products
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

// Function to get item by ID
function getItemById(id) {
  return listProducts.find(item => item.itemId === id);
}

// Create Redis client and promisify get/set methods
const client = createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Function to reserve stock by item ID
async function reserveStockById(itemId, stock) {
  await setAsync(`item.${itemId}`, stock);
}

// Function to get current reserved stock by item ID
async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock !== null ? parseInt(stock, 10) : null;
}

// Initialize Express server
const app = express();
const port = 1245;

// Route to get list of products
app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

// Route to get product details by item ID
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    res.json({ status: 'Product not found' });
    return;
  }

  const currentQuantity = await getCurrentReservedStockById(itemId);
  const stock = currentQuantity !== null ? currentQuantity : product.initialAvailableQuantity;

  res.json({
    itemId: product.itemId,
    itemName: product.itemName,
    price: product.price,
    initialAvailableQuantity: product.initialAvailableQuantity,
    currentQuantity: stock,
  });
});

// Route to reserve a product by item ID
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    res.json({ status: 'Product not found' });
    return;
  }

  const currentQuantity = await getCurrentReservedStockById(itemId);
  const stock = currentQuantity !== null ? currentQuantity : product.initialAvailableQuantity;

  if (stock <= 0) {
    res.json({ status: 'Not enough stock available', itemId });
    return;
  }

  await reserveStockById(itemId, stock - 1);
  res.json({ status: 'Reservation confirmed', itemId });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
