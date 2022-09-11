import express from 'express';
import path from 'path';

type ServeParams = {
  port: number;
  filename: string;
  dir: string;
};

export const serve = (params: ServeParams) => {
  const { port, filename, dir } = params;
  const app = express();

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
