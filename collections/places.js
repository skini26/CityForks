Places = new Mongo.Collection('places');

Meteor.methods({
  'fetchNearbyLocations': function(coords) {
    if (Meteor.isServer) {
      results = HTTP.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + coords.latitude + "," + coords.longitude + "&radius=500&types=food&key=AIzaSyCtfoCAldCEf8hXUlkVUd4UljqKR6W_aF4")
      console.log(results)
      _(results.data.results).each(function(place) {
        _.extend(loc, {place: {type: "Point", coordinates: [place.geometry.location.lng, place.geometry.location.lat]}})
        Places.upsert({id: place.id}, {$set: place})
      });
    }
  }
});
