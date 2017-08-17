/*
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.field = field;
  }
}

function assertValidLink ({url}) {
  try {
    new URL(url);
  } catch (error) {
    throw new ValidationError('Link validation error: invalid url.', 'url');
  }
}

function buildFilters({OR = [], description_contains, url_contains}) {
  const filter = (description_contains || url_contains) ? {} : null;
  if (description_contains) {
    filter.description = {$regex: `.*${description_contains}.*`};
  }
  if (url_contains) {
    filter.url = {$regex: `.*${url_contains}.*`};
  }

  let filters = filter ? [filter] : [];
  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(buildFilters(OR[i]));
  }
  return filters;
}
*/

console.log('loading resolversDynamo.js');

const insert = require('../dynamo/insertItem');
const read = require('../dynamo/readItem');

module.exports = {
  Query: {
    movie:  (obj, args, context) => {
    	console.log('fetch a movie');
    	console.log(args.title);
    	read('movie', args.title, function(err, data) {
    	    if (err) {
    	    	console.log('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
    	        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
    	        return err;
    	    } else {
    	        console.log('getItem success item:', JSON.stringify(data, null, 2));
    	        return data;
    	    }
    	});
    },
  },

  Mutation: {
	  createMovie:  (root, data) => {
	  console.log('creating a movie');
	  console.log(data.title);
	  console.log(data.year);
      return insert('movie', data.title, data.year);
    },

  },
};
