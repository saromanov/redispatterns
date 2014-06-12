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
		var ls = [];
		this.client.smembers("user: " + id, redis.print);
		console.log(this.client.script('load', 'return 1'));
		return ls;
	},
	doit: function(func, value){
		gunc(this.client, value);
	},
	chain: function(id){
		Chain(this.client, id, []);
	},
	dict: function(name, values){
		this.client.hmset(name, values);
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

function DFS(client, value){
	var marked=[];
	for(var i in client.followers(value)){
		if (!(i in marked)){
			DFS(client, i);
		}
	}
}


