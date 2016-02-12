if(Meteor.isServer){
	var request = Meteor.npmRequire("request");

	var foursquareSearch = function(){
		return Meteor.wrapAsync(function(location , cb){
			//console.log("https://api.foursquare.com/v2/venues/search?client_id="+Meteor.settings.fsq.ClientId+"&client_secret="+Meteor.settings.fsq.ClientSecret+"&query="+location+"&v="+Meteor.settings.fsq.Version+"&near=Singapore");
			request("https://api.foursquare.com/v2/venues/search?client_id="+Meteor.settings.fsq.ClientId+"&client_secret="+Meteor.settings.fsq.ClientSecret+"&query="+location+"&v="+Meteor.settings.fsq.Version+"&near=Singapore", function(err, result, body){
				var parsed = JSON.parse(body)["response"]["venues"];
				var entries = [];
				parsed.forEach(function(item){
					entries.push({
						name : item["name"],
						source : "Foursquare",
						id : item["id"],
						lat : item["location"]["lat"],
						lng : item["location"]["lng"]
					});
				});
				cb(err, entries);
			});
		});
	}
	var geocodeGoogle = function(){
		return Meteor.wrapAsync(function(location, cb){
			request("https://maps.googleapis.com/maps/api/place/textsearch/json?location=1.300,103.800&radius=50000&key="+Meteor.settings.googleApiKey+"&query="+location, function(err, result,body){

			});
		});
	}
	var googleSearch = function(){
		return Meteor.wrapAsync(function(location, cb){
			request("https://maps.googleapis.com/maps/api/place/textsearch/json?location=1.300,103.800&radius=50000&key="+Meteor.settings.googleApiKey+"&query="+location, function(err, result,body){
				var parsed = JSON.parse(body)['results'];
				var entries = [];
				parsed.forEach(function(item){
					entries.push({
						name : item["name"],
						source : "Google",
						id : item["place_id"],
						lat : item["geometry"]["location"]["lat"],
						lng : item["geometry"]["location"]["lng"]
					});
				});
				cb(err, entries);
			});
		});
	}
	Meteor.methods({
		geocode : function(text){
			//Session.set("test", Session.get("test") == null ? 0 : Session.get("test")+1);
			var googleResult = googleSearch()(text);
			var fsqResult = foursquareSearch()(text);
			var results = googleResult.concat(fsqResult);


			return results;
		}
	});
}
