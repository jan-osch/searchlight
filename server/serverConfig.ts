const serverConfig = {
  port: process.env.PORT,
  elastic: {
    host: process.env.ELASTIC_HOST || process.env.BONSAI_URL,
  },
  serveStaticFiles: process.env.SERVE,
  staticFilesLocation: 'c_build', // relative to project root
}

if (!serverConfig.elastic.host) {
  throw new Error('serverConfig.elastic.host is missing')
}

export default serverConfig
