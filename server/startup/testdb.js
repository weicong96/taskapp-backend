if (Meteor.isServer) {
  Meteor.startup(function () {
  	if(Task.find().count() == 0){
	  	Task.insert({
	  		name : "Test App"
	  	});
  	}
  	console.log(Task.find().count());
  });

}