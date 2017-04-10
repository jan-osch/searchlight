const serverConfig = {
  port: process.env.PORT,
  elastic: {
    host: process.env.ELASTIC_HOST,
    port: process.env.ELASTIC_PORT
  },
  serveStaticFiles: process.env.NODE_ENV === 'production' || true,
};

if (!serverConfig.elastic.host) {
  throw new Error('serverConfig.elastic.host is missing');
}
if (!serverConfig.elastic.port) {
  throw new Error('serverConfig.elastic.port is missing');
}

export default serverConfig;
