const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
  it('handles a GET request to /API/ethernet', done => {
    request(app) // fake request with supertest
      .get('/api/ethernet/greet')
      .end((err, response) => {
        assert(response.body.hi === 'Ethernet greets you');
        done();
      });
  });
});
