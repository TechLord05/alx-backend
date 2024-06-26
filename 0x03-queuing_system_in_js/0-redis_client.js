import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

// Handle connection errors
client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.message);
});

// Handle successful connection
client.on('ready', () => {
  console.log('Redis client connected to the server');
});
