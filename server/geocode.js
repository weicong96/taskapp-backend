if(Meteor.isServer){

	Meteor.methods({
		geocode : function(text){
			console.log(text);
			//Meteor.wrapAsync(function(){
			var geo = new GeoCoder();
			var result = geo.geocode(text);
			return result;
			//});
		}
	});
}
