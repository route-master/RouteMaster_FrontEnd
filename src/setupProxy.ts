import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/auth', {
      target: 'http://auth.route-master.org/v1',
      changeOrigin: true,
    }),
  );
};
