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


describe('POST /login', () => {
 
  it('OK, correct', (done) => {
    
    request(app).post('/addUser')
      .send(payloads[0])
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('username');
        expect(body).to.contain.property('password');
        expect(body).to.contain.property('type');
        done();
      })
      .catch((err) => done(err));
  });

  it('Fail, new user requires password', (done) => {
    request(app).post('/addUser')
      .send(payloads[1])
      .then((res) => {
        const body = res.body;
        expect(body.errors.password.name)
          .to.equal('ValidatorError');
        done();
      })
      .catch((err) => done(err));
  });

});

const payloads = [ {
    username: 'ajay',
    password: 'test_pass',
    type: 'manager'
    },
    {
    username: 'casemac',
    type: 'manager'
    }
    
];