import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/auth', {
      target: 'http://auth.route-master.org/v1',
      changeOrigin: true,
    }),
  );
  app.use(
    '^/((?!auth).)*$', // /auth를 제외한 모든 경로에 대한 정규 표현식
    createProxyMiddleware({
      target: 'http://api.route-master.org',
      changeOrigin: true,
    }),
  );
};
