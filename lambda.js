'use strict'

console.log('loading lambda.js');

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/index');
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
	console.log("request: " + JSON.stringify(event));
	awsServerlessExpress.proxy(server, event, context);
};
