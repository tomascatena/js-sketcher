import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

type ServeParams = {
  port: number;
  filename: string;
  dir: string;
};

export const serve = (params: ServeParams) => {
  const { port, filename, dir } = params;
  const app = express();

  app.use(
    createProxyMiddleware({
      target: 'http://localhost:3000',
      ws: true,
      logLevel: 'silent',
    })
  );

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
