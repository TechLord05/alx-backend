import { createClient, print } from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = createClient();

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.message);
});

client.on('ready', () => {
  console.log('Redis client connected to the server');
});

// Promisify the get function
const getAsync = promisify(client.get).bind(client);

// Function to set a new school in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

// Function to display the value of a school in Redis using async/await
async function displaySchoolValue(schoolName) {
  try {
    const reply = await getAsync(schoolName);
    console.log(reply);
  } catch (err) {
    console.log(err);
  }
}

// Call the functions as specified
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
