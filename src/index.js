'use strict'

console.log('loading index.js');

const express = require('express');

// This package automatically parses JSON requests.
const bodyParser = require('body-parser');

// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const {createServer} = require('http');
const {SubscriptionServer} = require('subscriptions-transport-ws');
//const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');

const {execute, subscribe} = require('graphql');

const expressGraphQL = require('express-graphql');

const schema = require('./schema');
const formatError = require('./formatError');

//const start =  () => {
  //const mongo =  connectMongo();
const app = express();

  const buildOptions =  (req, res) => {
    //const user =  authenticate(req, mongo.Users);
    return {
      // This context object is passed to all resolvers.
      context: {
        //dataloaders: buildDataloaders(mongo),
        //mongo,
        //user,
      },
      formatError,
      schema,
    };
  };
  app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

  const PORT = 3002;
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));
  
/*  app.use(
			'/',
			bodyParser.json(),
			expressGraphQL( () => {
				return {
					graphiql: true,
					schema: schema,
					formatError: formatError,
				};
			})
		);
  
module.exports = app;
*/

  const server = createServer(app);
  server.listen(PORT);
//};

//start();
