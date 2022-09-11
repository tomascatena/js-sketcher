import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';

type ServeParams = {
  port: number;
  filename: string;
  dir: string;
  useProxy: boolean;
};

export const serve = (params: ServeParams) => {
  const { port, filename, dir, useProxy } = params;
  const app = express();

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    const packagePath = require.resolve('local-client/dist/index.html');

    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
