var Database = require('./database.js')
	FIFO =     require('./fifo.js')

//https://github.com/mranney/node_redis

module.exports = Increment;


//Implementation of increment patterns
//http://redis.io/commands/incr
function Increment(client){
	if(client == undefined)
		this.client = redis.createClient();
	else
		this.client = client;
}

//Простой счётчик IP
Increment.prototype.limit_api_call = function(ip){
	var keyname = new Date().getDay();
	var current = 0
	this.client.get(ip, function(err, reply){
		if(reply > 10)
			console.log("Error: Too many request per second");
		else
		{
			this.client.incr(ip);
		}
	});
}

Increment.prototype.quit = function(){
	this.client.quit();
}
