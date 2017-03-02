const assert = require('assert');
const request = require('supertest');


const expected400ErrorMessage = {
  "error": "Could not decode request: JSON parsing failed"
}

//Utility function, to quickly test the JSON parsed body of a response
//to a predetermined object.
function MatchErrorMessage(body, expectedError) {
    console.log(body);
    responseBody = JSON.parse(body);
    assert.deepEqual('responseBody', expectedError, "Did not recieve the expected error message");
}

//This function will be called by bin/test.js, where server is a http server
module.exports = function TestRoutes(server) {

  //these tests will send mock requests to an instance of the app
  describe('Routes', function() {
    //tests for requests aimed at the root url for the domain.
    describe('root' , function() {

      //Test#1
      it('should return error 400 and a specific error message when the body is empty', function(done) {
        request(server)
          .post('/')
          .set('Content-Type', 'application/json')
          .send("")
          .expect(400)
          .expect(function(res) {
            MatchErrorMessage(res.text, expected400ErrorMessage);
          })
          .end(function(err) {
            if (err)
              return done(err);
            done();
          })
      });

      //Test#2
      it('should return error 400 and a specific error when the body does not contain valid JSON', function(done) {
        request(server)
          .post('/')
          .type('text')
          .send("This is not valid JSON. At least, I would hope so.")
          .expect(400)
          .expect(function(res) {
            MatchErrorMessage(res.text, expected400ErrorMessage);
          })
          .end(function(err) {
            if (err)
              return done(err);
            done();
          })
      });

    });
    //these test describe requests aimed for non defined routes
    describe('other', function() {
      it('should return 404 when the request is an invalid url', function(done) {
        request(server)
          .post('/not-a-real-url')
          .expect(404, done);
      });
    });
  });

}
