var redis = require("redis")

module.exports = Database;

function Database(){
	this.client = redis.createClient();
	this.client.on ("err", function(err){
		console.log("error");
	});
}

Database.prototype.setValues = function(tablename, hashname, values){
	console.log("Prepare to set: " + values.size + " elements");
	this.client.rpush(tablename, values)
	console.log("Operation is complete");
}

Database.prototype.addStruct = function(name, str){
	this.client.rpush(name, str);
}

Database.prototype.append = function(key, value){
	if(!this.client.exists(key))
		this.client.append(key, value);
}

//Return view of key ttl
Database.prototype.ttlview = function(key){
	return this.client.ttl(key);
}

Database.prototype.getKeys = function(pattern){
	return this.client.keys(pattern)
}

Database.prototype.quit = function(){
	this.client.quit();
	return true;
}