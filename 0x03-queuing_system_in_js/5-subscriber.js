import redis from 'redis';

// Create a Redis client
const subscriber = redis.createClient();

// Log connection messages
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

subscriber.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err}`);
});

// Subscribe to the channel
subscriber.subscribe('holberton school channel');

// Handle messages from the channel
subscriber.on('message', (channel, message) => {
  console.log(message);

  // If the message is "KILL_SERVER", unsubscribe and quit
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe('holberton school channel');
    subscriber.quit();
  }
});
