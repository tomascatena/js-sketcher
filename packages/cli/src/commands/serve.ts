import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path';

type Options = {
  port: string;
};

type LocalApiError = {
  code: string;
};

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4050')
  .action(async (filename = 'notebook.js', options: Options) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === 'string';
    };

    try {
      await serve({
        port: Number(options.port),
        filename: path.basename(filename),
        dir: path.join(process.cwd(), path.dirname(filename)),
        useProxy: !isProduction,
      });

      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
      );
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === 'EADDRINUSE') {
          console.error('Port is in use. Try running on a different port.');
        } else if (err.code === 'EACCES') {
          console.error('Port requires elevated privileges.');
        } else if (err instanceof Error) {
          console.error('Here is the problem', err.message);
        }
      } else if (err instanceof Error) {
        console.error('Here is the problem', err.message);
      }

      process.exit(1);
    }
  });
