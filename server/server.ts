import * as Hapi from 'hapi';
import config from './serverConfig';

import QueryService from './queryService';

const server = new Hapi.Server();

server.connection({port: config.port, host: 'localhost'});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});

addRoutesToServer(server);

function addRoutesToServer(serverInstance) {
  serverInstance.route({
    method: 'GET',
    path: '/api/lines',
    handler: async function (request, reply) {
      const queryParams = request.query;


      const results = queryParams.full
        ? await QueryService.search({text: queryParams.query, limit: 100, offset: 0})
        : await QueryService.search({text: queryParams.query, limit: 5, offset: 0});

      console.log(`performing search for: ${queryParams.query}, results: ${results.length}`);
      reply(results);
    }
  });
}

