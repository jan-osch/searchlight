import * as Hapi from 'hapi'
import * as Inert from 'inert'
import * as path from 'path'

import config from './serverConfig'
import QueryService from './queryService'

const staticFilesLocation = path.join(__dirname, '..', config.staticFilesLocation)

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: staticFilesLocation
      }
    }
  }
})

server.connection({port: config.port, host: 'localhost'})

if (config.serveStaticFiles) {
  console.log(`Server will be serving static files from: ${staticFilesLocation}`)
  server.register(Inert, () => console.log(`Inert started serving files from : ${config.staticFilesLocation}`))
}

server.start((err) => {
  if (err) {
    throw err
  }

  console.log(`Server running at: ${server.info.uri}`)
})

addRoutesToServer(server, config.serveStaticFiles)

function addRoutesToServer(serverInstance, serveStatic: boolean) {
  serverInstance.route({
    method: 'GET',
    path: '/api/lines',

    handler: async function (request, reply) {
      try {
        const queryParams = request.query

        const startTime = new Date().getTime()

        const results = queryParams.full
          ? await QueryService.search({text: queryParams.query, limit: 100, offset: 0})
          : await QueryService.search({text: queryParams.query, limit: 5, offset: 0})

        const duration = new Date().getTime() - startTime
        console.log(`performing search for: ${queryParams.query}, results: ${results.length} duration: ${duration}`)
        reply(results)

      } catch (e) {
        console.error(e)
        reply.code(500)
      }
    }
  })

  if (serveStatic) {
    serverInstance.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true
        }
      }
    })
  }
}

