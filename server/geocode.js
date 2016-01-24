if(Meteor.isServer){
	
	Meteor.methods({
		geoCode : function(){
			//Meteor.wrapAsync(function(){
			var geo = new GeoCoder();
			var result = geo.geocode('29 champs elysée paris');
			return result;
			//});
		}
	});
}