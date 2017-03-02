
/**
    These are the Mocha functional tests. They are invoked by 'npm test', or
    /bin/test.js.

    These test encompass general testing and invalid inputs.
 */

const assert = require('assert');
const request = require('supertest');


const expected400ErrorMessage = {
  "error": "Could not decode request: JSON parsing failed"
}

//Utility function, to quickly test the JSON parsed body of a response
//to a predetermined object. If parsing the response fails, then we
//throw an error anyway, which fails the test, so no try/catch block
//needed/
function MatchErrorMessage(body, expectedError) {
    responseBody = JSON.parse(body);
    assert.deepEqual(responseBody, expectedError, "Did not recieve the expected error message");
}

//This function will be called by bin/test.js, where server is a http server
//Note that this is the only thing this module exports, so it can be invoked as
// require('main')(server);
module.exports = function RunTests(server) {
  //tests for requests aimed at the root url for the domain.
  describe('/ (root url)' , function() {

    //Test#1
    it('should return error 400 and a specific error when the body is empty', function(done) {
      request(server)
        .post('/')
        .set('Content-Type', 'application/json')
        .send("")
        .expect(400)
        .expect(function(res) {
          MatchErrorMessage(res.text, expected400ErrorMessage);
        })
        .end(done)
    });

    //Test#2
    it('should return error 400 and a specific error when the body does not contain valid JSON', function(done) {
      const invalidJSON = "this is not valid JSON."

      request(server)
        .post('/')
        .type('application/json') //This is a total lie.
        .send(invalidJSON)
        .expect(400)
        .expect(function(res) {
          MatchErrorMessage(res.text, expected400ErrorMessage);
        })
        .end(done)
    });

    //Test#3
    it('should return error 400 and a specific error when there is no payload property', function(done) {
      const invalidPayload = {
        notPayload: [
          { title: 'not-a-real-show', 'drm' : true, 'episodeCount' : 1}
        ]
      };

      request(server)
        .post('/')
        .type('application/json')
        .send(invalidPayload)
        .expect(400)
        .expect(function(res) {
          MatchErrorMessage(res.text, expected400ErrorMessage);
        })
        .end(done)
    });


    //TODO: maybe I should break these larger test into individual tests?
    //Test#4
    it('should respond with a list of shows that have DRM and more than one episode', function(done) {
      //This is a totally legal payload, containing three shows.
      //Only the first two are valid
      const legalPayload = {
        payload: [
          {
            title: 'valid-show',
            'drm' : true,
            'episodeCount' : 1,
            image : {"showImage" : 'pee-en-gee.gif' },
            slug: 'show/validShow'
          },
          {
            title: 'another-valid-show',
            'drm' : true,
            'episodeCount' : 12,
            image : {"showImage" : 'guh-eii-ff.png' },
            slug: 'show/lovelyShow'
          },
          {
            title: 'invalid-show',
            'drm' : false,
            'episodeCount' : 1,
            image : {"showImage" : 'pee-en-gee.gif' },
            slug: 'show/validShow'
          }
        ]
      };
      //This is what we expect the answer to be
      const expectedResponse = {
        response : [
          {
            image: 'pee-en-gee.gif',
            slug: 'show/validShow',
            title: 'valid-show'
          },
          {
            title: 'another-valid-show',
            image : 'guh-eii-ff.png',
            slug: 'show/lovelyShow'
          },
        ]
      }

      request(server)
        .post('/')
        .type('json')
        .send(legalPayload)
        .expect(200)
        .expect(function(res) {
          const JSONrespose = JSON.parse(res.text);
          assert.deepEqual(JSONrespose, expectedResponse, "Server did not respond correctly");
        })
        .end(done)
    });
  });

  //these test describe requests aimed for non defined routes
  describe('misc routes', function() {
    //Test#5
    it('should return 404 when the request is an invalid url', function(done) {
      const fakeURL = "/not-a-real-url"; //This URL should be invalid.
      //TODO: how do I figure out which urls aren't real? should I just
      //input like 20 random chars? I think that's a different type of test

      request(server)
        .post(fakeURL)
        .expect(404)
        .end(done)
    });
  });

}
