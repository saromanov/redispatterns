var redis = require('redis')
	uuid = require('node-uuid')

//Implementation of simple job-queue

//This name for queue
var JobQueue = function(queuetitle){
	this.client = redis.createClient();
	this.queuetitle = queuetitle
	this.client.lrange('queue',0,-1, function(err, replies){
		if(replies.indexOf(queuetitle) != -1)
			console.err("This queue name already exist");
		else {
			this.client.lpush('queue', queuetitle, redis.print);
		}

	});
}


JobQueue.prototype.addJob = function(title, queueid){
	this.client.hkeys('queue', function(err, replies){
		if(replies.indexOf(title)){
			//Create current job
			this.client.hset(title, 'status', 'wait');
			this.client.hset(this.queuetitle, queueid, title, redis.print);
		}

	});
}

JobQueue.prototype.startJob = function(title, queueid) {
	this.client.hkeys('queue', function(err, replies){
		if(replies.indexOf(title)){
			changeJobStatus(title, 'wait', 'working');
		}
	});
}


JobQueue.prototype.removeJob = function(title){
	this.client.hkeys('queue', function(err, replies){
		if(replies.indexOf(title)){
			changeJobStatus(title, 'working', 'delete');
		}
	});
}

var changeJobStatus = function(client, title, status, newstatus) {
	client.hget(title, status, function(err, replies){
			if(replies == status)
				this.client.hset(title, 'status', newstatus, redis.print);
	});
}


module.exports = JobQueue;