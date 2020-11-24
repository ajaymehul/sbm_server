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

  it('Fail, 1 task to receive', (done) => {
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