import kue from 'kue';

// Create Queue
const queue = kue.createQueue();

// Define the sendNotification function
function sendNotification(phoneNumber, message) {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs in the push_notification_code queue
queue.process('push_notification_code', function(job, done){
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message);
    done();
});
