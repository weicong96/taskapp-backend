if(Meteor.isServer){

	Meteor.methods({
		geocode : function(text){
			//Meteor.wrapAsync(function(){
			var geo = new GeoCoder();
			var result = geo.geocode({address : text, country : "Singapore"});
			console.log(result);
			return result;
		}
	});
}
