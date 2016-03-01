Meteor.publish("getTaskForPerson", (userId)=>{
	return Task.find({userid : userId});
});
Meteor.methods({
	addTask : function(task){
		console.log(task);
		check(task, {
			title : String,
			location : Object,
			inform : String
		});
		return Task.insert(task);
	}
})