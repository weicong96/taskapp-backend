Meteor.publish("getTaskForPerson", (userId)=>{
	return Task.find({userid : userId});
});