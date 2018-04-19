const testConfig = require('../testConfig');
const request = require('supertest')(testConfig.apiHost);

test('GET /account should return user info', function(done) {
  request
    .get('/account')
    .set('Authorization', `Basic ${'xxx'}`)
    .end((err, res) => {
      expect(err).toBe(null);
      done();
    });
});
