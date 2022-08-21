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
      build.onLoad({ filter: /.*/ }, async (args) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        }

        /**
         * Cached file from indexedDB.
         */
        const cached = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        if (cached) {
          return cached;
        }

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
