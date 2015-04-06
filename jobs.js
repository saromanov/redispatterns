var redis = require('redis')
	uuid = require('node-uuid')

//Implementation of simple job-queue

var JobQueue = function(title){
	this.client = redis.createClient();
}

JobQueue.prototype.addJob = function(title, queueid){
	this.client.hkeys('queue', function(err, replies){
		var length = 0;
		var contains = false;
		replies.forEach(function(r,i){
			if(r ==  replies) contains = true;
			length += 1;
		});
		if(contains){
			this.client.hset('queue', queueid, title, redis.print);
		}

	})
}

JobQueue.prototype.removeJob = function(id){

}