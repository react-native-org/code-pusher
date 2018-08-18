var app = require('../../../app');
var request = require('supertest')(app);
var should = require("should");
var security = require('../../../core/utils/security');
var factory = require('../../../core/utils/factory');
var _ = require('lodash');

describe('api/sessions/sessions.test.js', function() {
  var account = '522539441@qq.com';
  var password = '123456';
  var authToken;
  var friendlyName = 'sessions';
  var machineName = 'tablee.hosts';
  before(function(done){
    request.post('/auth/login')
    .send({
      account: account,
      password: password
    })
    .end(function(err, res) {
      should.not.exist(err);
      var rs = JSON.parse(res.text);
      rs.should.containEql({status:"OK"});
      authToken = (new Buffer(`auth:${_.get(rs, 'results.tokens')}`)).toString('base64');
      done();
    });
  });

  describe('create accessKeys', function() {
    it('should create accessKeys successful', function(done) {
      request.post(`/accessKeys`)
      .set('Authorization', `Basic ${authToken}`)
      .send({createdBy: machineName, friendlyName: friendlyName, isSession: true, ttl: 30*24*60*60})
      .end(function(err, res) {
        should.not.exist(err);
        res.status.should.equal(200);
        var rs = JSON.parse(res.text);
        rs.should.have.properties('accessKey');
        rs.accessKey.should.have.properties(['name', 'createdTime', 'createdBy',
          'expires', 'isSession', 'description', 'friendlyName']);
        done();
      });
    });
  });

  describe('delete sessions', function() {
    it('should delete sessions successful', function(done) {
      request.delete(`/sessions/${encodeURI(machineName)}`)
      .set('Authorization', `Basic ${authToken}`)
      .send()
      .end(function(err, res) {
        should.not.exist(err);
        res.status.should.equal(200);
        done();
      });
    });
  });
});
