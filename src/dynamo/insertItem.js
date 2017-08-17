'use strict'

console.log('loading insertItem');


module.exports =  
   function insert(tableName, title, year){
	return new Promise(function(resolve, reject) {
	console.log('insert item call');
	var AWS = require('aws-sdk');

	AWS.config.update({
	  region: 'us-west-2',
	  endpoint: 'https://dynamodb.us-west-2.amazonaws.com'
	});

	console.log('waiting to create the connection');
	var docClient = new AWS.DynamoDB.DocumentClient();
	console.log('Connection made');
	
	var table = tableName;

	var params = {
	    TableName:table,
	    Item:{
	        'year': year,
	        'title': title
	    }
	};

	console.log('Adding a new item...');
	return docClient.put(params, function(err, data) {
	    if (err) {
	    	console.log('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
	        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
	        return reject(err);
	    } else {
	        console.log('Added item:', JSON.stringify(data, null, 2));
	        return resolve(params.Item);
	    }
	});
	});
}

