/**
  These function denote operations to be performed on Shows and Lists of shows.
  The idea of show 'validity' is sourced from http://codingchallenge.nine.com.au/,
  which describes

    "From the list of shows in the request payload,
    return the ones with DRM enabled (drm: true)
    and at least one episode (episodeCount > 0)."

  And that

    "The returned JSON should have a response key with an array of shows.
    Each element should have the following fields from the request:

      +image - corresponding to image/showImage from the request payload
      +slug
      +title
    "

  These functions are mostly invoked from /routes/index.js
 */

//Return only the properties that are needed. This assumes that the properties
//are present on the show.
function GetShowProperties(show) {
  var showImage = show.showImage

  return {
    image: show.image.showImage,
    slug: show.slug,
    title: show.title
  }
}

//Tests whether the input show has the DRM value set to true, and has at
//lease one episode
function IsShowValid(showToTest) {
  //make sure drm equals nothing BUT the value true, not just a 'truthy' value
  return (showToTest.drm === true) && showToTest.episodeCount > 0;
}

//
function GetValidShowsFromArray(listOfShows) {
  //This array will be populated with shows that mach the IsShowValid function
  var validShows = []
  //loop through all shows in the list
  for(var i = 0; i < listOfShows.length; i++) {
    //Test each show to see it has DRM and at least one episode
    if(IsShowValid(listOfShows[i])) {
      //If it does, add it to the end of the list of valid shows
      validShows.push(GetShowProperties(listOfShows[i]));
    }
  }
  return validShows;
}

exports.getShowProperties = GetShowProperties;
exports.isShowValid = IsShowValid;
exports.getValidShowsFromArray = GetValidShowsFromArray;
