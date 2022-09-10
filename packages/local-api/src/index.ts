type ServeParams = {
  port: number;
  filename: string;
  dir: string;
};

export const serve = (params: ServeParams) => {
  console.log('Serving traffic on port', params.port);
  console.log('Saving/fetching cells from', params.filename);
  console.log('That file is in directory', params.dir);
};
