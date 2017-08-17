'use strict'

console.log('loading readItem');

module.exports =  
   function read(tableName, title){
	
	return new Promise(function(resolve, reject) {
	console.log('read item call');
	var AWS = require("aws-sdk");

	AWS.config.update({
	  region: "us-west-2",
	  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
	});

	console.log('waiting to create the connection');
	var docClient = new AWS.DynamoDB.DocumentClient();
	console.log('Connection made');
	
	var table = tableName;

	var params = {
	    TableName:table,
	    Key:{
	        "title": title
	    }
	};
	console.log('table name: ', table, ' title: ', title);
	console.log(params);
	console.log('Reading a new item...');
	docClient.get(params, function(err, data) {
	    if (err) {
	    	console.log('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
	        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
	        return reject(err);
	    } else {
	        console.log('getItem success item:', JSON.stringify(data, null, 2));
	        return resolve(data["Item"]);
	    }
	});
	});
}
