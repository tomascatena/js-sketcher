import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

/**
 * indexedDB instance
 */
const fileCache = localForage.createInstance({
  name: 'js-sketcher-file-cache',
});

export const unpkgFetchPlugin = (inputCode: string) => {
  return {
    name: 'unpkg-fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /^index\.js/ }, () => {
        return {
          loader: 'tsx',
          contents: inputCode,
        };
      });

      /**
       * Retrieve a file from the cache, if exists.
       * Otherwise, continue to the next onLoad and fetch the file from unpkg.com.
       */
      build.onLoad({ filter: /.*/ }, async (args) => {
        const cached = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        if (cached) {
          return cached;
        }
      });

      /**
       * Handle css files.
       * Fetch a file from unpkg.com and cache it.
       */
      build.onLoad({ filter: /.css$/ }, async (args) => {
        const { data, request } = await axios.get(args.path);

        const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");

        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'tsx',
          contents: contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });

      /**
       * Handle js files.
       * Fetch a file from unpkg.com and cache it.
       */
      build.onLoad({ filter: /.*/ }, async (args) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'tsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
