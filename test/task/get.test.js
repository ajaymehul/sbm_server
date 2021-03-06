process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');
const dbHandler = require('./../../db/index');
const app = require('./../../app');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clear());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.close());


describe('GET /tasks', () => {
 
  it('OK, no tasks to receive', (done) => {
    
    request(app).get('/tasks')
      .then((res) => {
        const body = res.body;
        expect(body.length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, 1 task to receive', (done) => {
    request(app).post('/addTask')
      .send(payloads[0])
      .then((res) => {
        request(app).get('/tasks').then((res) => {
          const body = res.body;
          expect(body.length).to.equal(1);
          done();
        });
      })
      .catch((err) => done(err));
  });

  it('OK, add task and get task for same user, 1 total', (done) => {
    request(app).post('/addTask')
      .send(payloads[1])
      .then((res) => {
        request(app).get('/tasks/'+payloads[1].assigned).then((res) => {
          const body = res.body;
          expect(body.length).to.equal(1);
          done();
        });
      })
      .catch((err) => done(err));
  });

  it('OK, add task and get task for different user, 0 total', (done) => {
    request(app).post('/addTask')
      .send(payloads[1])
      .then((res) => {
        request(app).get('/tasks/'+payloads[2].assigned).then((res) => {
          const body = res.body;
          expect(body.length).to.equal(0);
          done();
        });
      })
      .catch((err) => done(err));
  });


});

describe('GET /shifts', () => {

  it('OK, no shifts will be received', (done) => {

    request(app).get('/shifts')
      .then((res) => {
        const body = res.body;
        expect(body.length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, 1 shift to receive', (done) => {
    request(app).post('/addShift')
      .send(shiftTestData[0]) //change
      .then((res) => {
        request(app).get('/shifts').then((res) => {
          const body = res.body;
          expect(body.length).to.equal(1);
          done();
        });
      })
      .catch((err) => done(err));
  });

  it('OK, get shifts for a specific employee, 1 total', (done) => {
    request(app).post('/addShift')
      .send(shiftTestData[0])
      .then((res) => {
        request(app).get('/shifts/' + shiftTestData[0].assignedTo).then((res) => {
          const body = res.body;
          expect(body.length).to.equal(1);
          done();
        });
      })
      .catch((err) => done(err));
  });

  // it('OK, get shifts for all other employees, 2 total', (done) => {
  //   request(app).post('/addShift')
  //     .send(shiftTestData[0])
  //     .then((res) => {
  //       request(app).post('/addShift')
  //         .send(shiftTestData[1])
  //         .then((res) => {
  //           request(app).post('/addShift')
  //             .send(shiftTestData[2])
  //             .then((res) => {
  //               request(app).get('/shiftsOther/' + shiftTestData[0].assignedTo).then((res) => {
  //                 const body = req.body;
  //                 expect(body.length).to.equal(2);
  //                 expect(body[0].assignedTo).to.equal(shiftTestData[1].assignedTo);
  //                 expect(body[1].assignedTo).to.equal(shiftTestData[2].assignedTo);
  //                 done();


  //               });
  //             });
  //         });
  //     });
  // });

});



const shiftTestData = [
  {
    startTime: "1606981020000",
    endTime: "1606996800000",
    assignedTo: "casemac"
  },
  {
    startTime: "1606981380000",
    endTime: "1606996800000",
    assignedTo: "thomas"
  },

  {
    startTime: "1606981380000",
    endTime: "1606996800000",
    assignedTo: "haley"
  },
]










const payloads = [ {
      title: 'Mocha test',
    description: 'Clean the restroom properly. Clean the restroom properly. Clean the restroom properly. Clean the restroom properly. Clean the restroom properly.',
    subTasks: [
        {
            st_desc: 'Replace the toilet papers',
            completed: true
        },
        {
            st_desc: 'Refill handwashing soap',
            completed: true
        }
    ],
    role: 'Janitor',
    shift: '8:00-17:00',
    status: 'incomplete',
    assigned: 'open'
    },
     {
        title: 'Mocha test',
    description: 'Clean the restroom properly. Clean the restroom properly. Clean the restroom properly. Clean the restroom properly. Clean the restroom properly.',
    subTasks: [
        {
            st_desc: 'Replace the toilet papers',
            completed: true
        },
        {
            st_desc: 'Refill handwashing soap',
            completed: true
        }
    ],
    role: 'Janitor',
    shift: '8:00-17:00',
    status: 'incomplete',
    assigned: 'mochaboy'
    },
    {
        title: 'Mocha test',
    description: 'Clean the restroom properly. Clean the restroom properly. Clean the restroom properly. Clean the restroom properly. Clean the restroom properly.',
    subTasks: [
        {
            st_desc: 'Replace the toilet papers',
            completed: true
        },
        {
            st_desc: 'Refill handwashing soap',
            completed: true
        }
    ],
    role: 'Janitor',
    shift: '8:00-17:00',
    status: 'incomplete',
    assigned: 'notmochaboy'
    }
    ];


