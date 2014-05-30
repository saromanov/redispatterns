var redis = require('redis')

module.exports= FIFO;
//FIFO queue
function FIFO(client){
	this.store = []
	this.client = client.client
	this.client.debug_mode  =true;
}

FIFO.prototype.push = function(name, data){
	this.client.lpush(name, data);
}

FIFO.prototype.pop = function(name){
	this.client.rpop(name, function(err, data){
		console.log(data);
	});
}

FIFO.prototype.show = function(command, name){
	command(name, function(err, data){
		console.log(data);
	});
}

//Probability left or right pop
FIFO.prototype.prob_pop = function(name){
	var prob = Math.round(Math.random() * 100);
	if(prob % 2 == 0)
		this.client.rpop(name, function(err, data){
			console.log(data);
		});
	else
		this.client.lpop(name, function(err, data){
			console.log(data);
		});
}