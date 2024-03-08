const esbuild = require("esbuild");
const cssModulesPlugin = require("esbuild-plugin-css-modules");
const sassPlugin = require('esbuild-sass-plugin');

esbuild
  .build({
    entryPoints: ["src/index.js"],
    bundle: true,
    outfile: "dist/bundle.js",
    loader: { '.js': 'jsx' },    
    plugins: [
      cssModulesPlugin({
        localIdentName: "[local]--[hash:8:md5:hex]",
      }),
      sassPlugin.default(),
    ],
  })
  .catch((e) => console.error(e.message));
