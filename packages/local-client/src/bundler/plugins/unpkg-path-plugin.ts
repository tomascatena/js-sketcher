import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      /**
       * Path resolution algorithm.
       */

      // When esbuild is looking for the path to 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return {
          path: 'index.js',
          namespace: 'a',
        };
      });

      // When esbuild is looking for the relative path to a module ('./' or '../')
      build.onResolve({ filter: /^\.+\// }, (args) => {
        return {
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
          namespace: 'b',
        };
      });

      // When esbuild is looking for the main file of a module
      build.onResolve({ filter: /.*/ }, async (args) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
