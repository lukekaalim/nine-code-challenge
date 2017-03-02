//The Module that we are going to be testing
const shows = require('../lib/shows.js');

const assert = require('assert');

module.exports = function RunTests() {

  describe('Returning a  Valid Show', function() {
    //#Test 1
    it('should only have the image, slug, and title properties',
    function() {

      const exampleShow = {
        'country' : 'australia',
        'slug' : 'show/im-real-i-swear',
        'image' : {
          'showImage' : 'hach-tee-tee-pee.foo'
        },
        'primaryColour': '#ff7800',
        'title' : 'example-show ;)',
        'propertyThatShouldNotAppear' : 'randomValue'
      }

      const resultObject = shows.getShowProperties(exampleShow);

      //Assert that all three properties exist
      assert.notEqual(resultObject.title, undefined);
      assert.notEqual(resultObject.image, undefined);
      assert.notEqual(resultObject.slug, undefined);

      assert.equal(resultObject.country, undefined);
      assert.equal(resultObject.primaryColour, undefined);
      assert.equal(resultObject.propertyThatShouldNotAppear, undefined);
    });


    //#Test 2
    it('should match values from the original object', function() {

      const exampleShow = {
        'country' : 'australia',
        'slug' : 'show/im-real-i-swear',
        'image' : {
          'showImage' : 'hach-tee-tee-pee.foo'
        },
        'primaryColour': '#ff7800',
        'title' : 'example-show ;)',
        'property-that-should-not-appear' : 'randomValue'
      }

      const expectedResult = {
        'image' : 'hach-tee-tee-pee.foo',
        'slug' : 'show/im-real-i-swear',
        'title' : 'example-show ;)'
      }

      assert.deepEqual(shows.getShowProperties(exampleShow), expectedResult);
    });
  });

  describe('Checking a Show\'s Validity', function() {
    //#Test 3
    it('should return true for show that has DRM and one episode', function() {

      const exampleShow = {
        'drm' : true,
        'episodeCount' : 1
      }

      assert(shows.isShowValid(exampleShow));
    });
    //#Test 4
    it('should return false for show that has one episode but no DRM', function() {

      const exampleShow = {
        'drm' : false,
        'episodeCount' : 1
      }

      assert(!shows.isShowValid(exampleShow));
    });
    //#Test 5
    it('should return false for show that has a \'truthy\' value for DRM, but is not actually true', function() {

      const exampleShow = {
        'drm' : 'true', //The word "true" is truthy
        'episodeCount' : 1
      }
      const anotherExampleShow = {
        'drm' : { 'a non empty object is truthy' : true }, //The word
        'episodeCount' : 1
      }
      const theLastExampleShow = {
        'drm' : 1, //the number one is normally truthy
        'episodeCount' : 1
      }

      assert(!shows.isShowValid(exampleShow));
      assert(!shows.isShowValid(anotherExampleShow));
      assert(!shows.isShowValid(theLastExampleShow));
    });
    //#Test 6
    it('should return false for show that doesnt have drm or episode count', function() {

      const exampleShow = {
        'drm' : false,
        'number-of-episodes' : 1
      }

      const anotherExampleShow = {
        'digital-rights' : false,
        'episodeCount' : 1
      }

      assert(!shows.isShowValid(exampleShow));
      assert(!shows.isShowValid(anotherExampleShow));
    });

  });

  /**
    Tests for exports.getValidShowsFromArray are mostly covered by
    application.test.js, and it would be a waste of time to replicate them at
    a unit level.
  */

}
