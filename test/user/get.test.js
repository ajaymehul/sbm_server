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


describe('GET /users', () => {
 
  it('OK, no employee users to receive', (done) => {
    
    request(app).get('/users')
      .then((res) => {
        const body = res.body;
        expect(body.length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, add 1 employee, 1 employee to receive', (done) => {
    request(app).post('/addUser')
      .send(payloads[0])
      .then((res) => {
        request(app).get('/users').then((res) => {
          const body = res.body;
          expect(body.length).to.equal(1);
          done();
        });
      })
      .catch((err) => done(err));
  });

  

  it('OK, add 1 manager, 0 employee to receive', (done) => {
    request(app).post('/addUser')
      .send(payloads[1])
      .then((res) => {
        request(app).get('/users').then((res) => {
          const body = res.body;
          expect(body.length).to.equal(0);
          done();
        });
      })
      .catch((err) => done(err));
  });


});

const payloads = [ {
    username: 'ajay',
    password: 'test_pass',
    type: 'employee'
    },
    {
    username: 'casemac',
    password: 'test_pass',
    type: 'manager'
    }
    
];