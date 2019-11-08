const chalk = require('chalk');
const express = require('express');
const compression = require('compression');
const fallback = require('express-history-api-fallback');
const proxy = require('express-http-proxy');

const build = `${__dirname}/../build`;
const { npm_package_config_api_proxy_port: API_PORT } = process.env;

const getPath = req => require('url').parse(req.url).path;

const createProxy = (path = '') =>
  proxy(`localhost:${API_PORT}`, { proxyReqPathResolver: req => `${path}${getPath(req)}` });

module.exports = (callback = () => {}) => {
  const app = express();
  app.use(compression());
  app.use(express.static(build));
  app.use('/rpc', createProxy('/rpc'));
  app.use('/print', createProxy('/print'));
  app.use('/logout', createProxy('/logout'));
  app.use('/login', createProxy('/login'));
  app.use(fallback('index.html', { root: build }));
  return app.listen(3000, () => {
    console.log(chalk.green('Running on http://localhost:3000'));
    callback();
  });
};
