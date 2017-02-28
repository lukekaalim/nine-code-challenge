/**
  This is the main test file. These files are executed by Mocha by running
  npm test, as well as by CircleCI. They use the standard assertion library,
  and cover a variety of unit tests and
 */

var assert = require('assert');


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
