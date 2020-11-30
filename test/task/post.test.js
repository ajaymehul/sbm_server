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


describe('POST /addTask', () => {
 
  it('OK, adding Task works', (done) => {
    
    request(app).post('/addTask')
      .send(payloads[0])
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('title');
        expect(body).to.contain.property('description');
        expect(body).to.contain.property('subTasks');
        expect(body).to.contain.property('role');
        expect(body).to.contain.property('shift');
        expect(body).to.contain.property('status');
        expect(body).to.contain.property('assigned');
        done();
      })
      .catch((err) => done(err));
  });

  it('Fail, new task requires title', (done) => {
    request(app).post('/addTask')
      .send(payloads[1])
      .then((res) => {
        const body = res.body;
        expect(body.errors.title.name)
          .to.equal('ValidatorError');
        done();
      })
      .catch((err) => done(err));
  });

});

// Testing the delete Task functionality
describe('POST /deleteTask/:taskid', () => {

  it('OK, deleting a specific Task works', (done) => {
    request(app).post('/addTask')
      .send(payloads[0])
      .then((res) => {
        const taskid = res.body["_id"];
        request(app).post('/deleteTask/' + taskid)
          .then((res) => {
            request(app).get('/tasks')
              .then((res) => {
                const body = res.body;
                expect(body.length).to.equal(0);
                done();
              })
              .catch((err) => done(err));
          })

        done();
      })
      .catch((err) => done(err));
    console.log("exiting")
  });

});







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
    }];
