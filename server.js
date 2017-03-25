'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

const PORT = process.env.PORT;

server.connection({port: PORT, host: 'localhost'});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        console.log('received a request: ', request.path);
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        console.log('received a request: ', request.path);
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});