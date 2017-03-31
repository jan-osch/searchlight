import * as Hapi from "hapi";
import config from "./serverConfig";

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
    path: '/',
    handler: function (request, reply) {
      console.log('received a request: ', request.path);
      reply('Hello, world!');
    }
  });

  serverInstance.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
      console.log('received a request: ', request.path);
      reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
  });
}
