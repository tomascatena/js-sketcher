import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path';

type Options = {
  port: string;
};

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4050')
  .action((filename = 'notebook.js', options: Options) => {
    serve({
      port: Number(options.port),
      filename: path.basename(filename),
      dir: path.join(process.cwd(), path.dirname(filename)),
    });
  });
