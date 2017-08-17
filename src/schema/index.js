
console.log('loading indexDynamo.js');
const {makeExecutableSchema} = require('graphql-tools');
/*destructuring assignment 
const name = app.name;
const version = app.version;
const type = app.type;

const { name, version, type } = app;

const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
*/
const resolvers = require('./resolvers');

// Define your types here.
const typeDefs = `
  type Query {
    movie(title:String!): Movie!
  }

  type Mutation {
    createMovie(title: String!, year: String!): Movie

  }

  type Movie {
    title: String!
    year: String!
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({typeDefs, resolvers});

//The graphql-tools package, as the name indicates, provides several tools that help build GraphQL servers. 
//The one you’re using here is makeExecutableSchema, which takes a string in the schema definition language 
//and returns a complete GraphQLSchema object to be used by your server.
