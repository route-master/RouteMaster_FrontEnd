/* eslint-disable import/no-import-module-exports */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app: any) => {
  app.use(
    createProxyMiddleware(['/user', '/privacy'], {
      target: 'http://auth.route-master.org/v1',
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware(['/plan', '/attraction', '/file', '/weather'], {
      target: 'http://api.route-master.org',
      changeOrigin: true,
    }),
  );
};
