var Database = require('../database.js')

//Basic test for create db

//https://github.com/caolan/nodeunit 
exports.testCreateServer = function(data){
	var vfs = new Database();
	data.ok(vfs.quit(), "This is assertion")
	data.done()
}

exports.testAddSomething = function(data){
	
}