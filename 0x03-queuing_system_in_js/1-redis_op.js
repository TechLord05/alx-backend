import { createClient, print } from 'redis';

// Create a Redis client
const client = createClient();

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.message);
});

client.on('ready', () => {
  console.log('Redis client connected to the server');
});

// Function to set a new school in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

// Function to display the value of a school in Redis
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.log(err);
    } else {
      console.log(reply);
    }
  });
}

// Call the functions as specified
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
