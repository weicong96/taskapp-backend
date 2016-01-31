if(Meteor.isServer){

	Meteor.methods({
		geocode : function(text){
			//Meteor.wrapAsync(function(){
			var geo = new GeoCoder();
			var result = geo.geocode({address : text, country : "Singapore"});

			var request = Meteor.npmRequire("request");

			var locationSearch = Meteor.wrapAsync(function(location, cb){
						console.log("https://maps.googleapis.com/maps/api/place/textsearch/json?key="+Meteor.settings.googleApiKey+"&query="+location+" in Singapore");
				request("https://maps.googleapis.com/maps/api/place/textsearch/json?key="+Meteor.settings.googleApiKey+"&query="+location+" in Singapore", function(err, result,body){
					var parsed = JSON.parse(body)['results'];
					cb(err, parsed);
				});
			});
			var googleResult = locationSearch(text);
			var entries = [];

			for(var i = 0; i < googleResult.length; i ++){
				var parsedEntry = {
					name : googleResult[i]["formatted_address"]
				};
				entries.push(parsedEntry);
			}
			for(var i = 0; i < result.length;i++){
				var parsedEntry = {
					name : result[i]["formattedAddress"]
				};
				entries.push(parsedEntry);
			}
			return entries;
		}
	});
}
