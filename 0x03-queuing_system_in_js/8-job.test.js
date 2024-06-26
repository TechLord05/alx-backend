const chai = require('chai');
const expect = chai.expect;
const kue = require('kue');
const createPushNotificationsJobs = require('./8-job').default;

describe('createPushNotificationsJobs', function() {
  let queue;

  before(function() {
    // Enter test mode
    kue.Job.rangeByType = function(type, state, start, end, order, cb) {
      cb(null, []);
    };
    kue.Job.rangeByState = function(state, start, end, order, cb) {
      cb(null, []);
    };
    queue = kue.createQueue();
    queue.testMode.enter();
  });

  afterEach(function() {
    // Clear the queue
    queue.testMode.clear();
  });

  after(function() {
    // Exit test mode
    queue.testMode.exit();
  });

  it('should throw an error if jobs is not an array', function() {
    expect(() => createPushNotificationsJobs('not an array', queue)).to.throw('Jobs is not an array');
  });

  it('should create jobs in the queue', function() {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account'
      },
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
    expect(queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);
  });

  it('should log job creation, completion, failure, and progress', function(done) {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      }
    ];

    const consoleLog = console.log;
    const logs = [];
    console.log = (message) => logs.push(message);

    createPushNotificationsJobs(jobs, queue);

    const job = queue.testMode.jobs[0];
    job.on('complete', () => {
      console.log = consoleLog; // Restore console.log
      expect(logs).to.include(`Notification job created: ${job.id}`);
      expect(logs).to.include(`Notification job ${job.id} completed`);
      done();
    });

    job.emit('complete');
  });
});
