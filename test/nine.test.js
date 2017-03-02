/**
  Nine.js is a test file that matches the examples provided from the
  http://codingchallenge.nine.com.au/, to make sure that we still fit the
  specification. It reads the sample request abd response from the file system
 */

var assert = require('assert');
var request = require('supertest');
var fs = require('fs');

module.exports = function RunTests(server) {
  describe('/ (root url)' , function() {
    it('should exactly match the sample request/response files', function(done) {

      //downloaded from http://codingchallenge.nine.com.au/sample_request.json
      var sampleRequest = fs.readFileSync("./test/sample_request.json", {encoding : 'utf-8'});
      //downloaded form http://codingchallenge.nine.com.au/sample_response.json
      var sampleResponse = JSON.parse(fs.readFileSync("./test/sample_response.json", {encoding : 'utf-8'}));

      request(server)
        .post('/')
        .type('application/json')
        .send(sampleRequest)
        .expect(200)
        .expect(function(res) {
          //Expect that the result of this request will exacly match the loaded
          //file.
          var JSONrespose = JSON.parse(res.text);
          assert.deepEqual(JSONrespose, sampleResponse, "Server response does not match expected response");
        })
        .end(done)
    });

  });
};
