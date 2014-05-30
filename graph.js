var redis = require('redis')

//Implementation of simple social graph
//http://www.rediscookbook.org/implement_a_social_graph.html

function User(){
	this.client = redis.createClient()
}

User.prototype = {
	//Set user id
	add: function(user, fuser){
		this.client.sadd("user: " + user, fuser);
	},
	followers: function(id){
		this.client.smembers("user: " + id, function(err, obj){
			console.log(obj);
		});
	},
	chain: function(id){
		Chain(this.client, id, []);
	},
	quit: function(){
		this.client.quit();
	}

}

function Chain(client, id, users){
	client.smembers("user: " + id, function(err, obj){
		if(obj.length != 0)
			for(var i in obj){
				console.log("id: " + id + ", follower: " + obj);
				if(users.indexOf(obj[i]) != -1)
					return users
				users.push(obj[i])
				Chain(client, obj[i], users);
			}
		});
}
