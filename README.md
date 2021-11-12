## Source

Got the majority of this code from https://github.com/xiaoluoboding/nuxt3-starter/generate, thx a lot

## Setup

### Installation

Make sure to install the dependencies

```bash
yarn install
```

### Development

Start the development server on http://localhost:3000

```bash
yarn dev
```

### Production

Build the application for production:

```bash
yarn build
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).# nuxt3-reproduce-bug

## Bug

(node:22218) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/Users/francisberger/code/tests/2021/nov/test2/node_modules/@ethersproject/logger/lib.esm/_version.js:1
export const version = "logger/5.5.0";
^^^^^^

SyntaxError: Unexpected token 'export'
    at wrapSafe (internal/modules/cjs/loader.js:984:16)
    at Module._compile (internal/modules/cjs/loader.js:1032:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1097:10)
    at Module.load (internal/modules/cjs/loader.js:933:32)
    at Function.Module._load (internal/modules/cjs/loader.js:774:14)
    at ModuleWrap.<anonymous> (internal/modules/esm/translators.js:199:29)
    at ModuleJob.run (internal/modules/esm/module_job.js:152:23)
    at async Loader.import (internal/modules/esm/loader.js:177:24)
    at async __instantiateModule__ (file:///Users/francisberger/code/tests/2021/nov/test2/.nuxt/dist/server/server.mjs:19439:3)
[Vue Router warn]: uncaught error during route navigation:
Error: [vite dev] Error loading external "/Users/francisberger/code/tests/2021/nov/test2/node_modules/@ethersproject/logger/lib.esm/_version.js".
    at file:///Users/francisberger/code/tests/2021/nov/test2/.nuxt/dist/server/server.mjs:5597:314
    at async __instantiateModule__ (file:///Users/francisberger/code/tests/2021/nov/test2/.nuxt/dist/server/server.mjs:19439:3)
[vite dev] Error loading external "/Users/francisberger/code/tests/2021/nov/test2/node_modules/@ethersproject/logger/lib.esm/_version.js".
  at file://./.nuxt/dist/server/server.mjs:5597:314
  at async __instantiateModule__ (file://./.nuxt/dist/server/server.mjs:19439:3)
(node:22218) UnhandledPromiseRejectionWarning: Error: [vite dev] Error loading external "/Users/francisberger/code/tests/2021/nov/test2/node_modules/@ethersproject/logger/lib.esm/_version.js".
    at file:///Users/francisberger/code/tests/2021/nov/test2/.nuxt/dist/server/server.mjs:5597:314
    at async __instantiateModule__ (file:///Users/francisberger/code/tests/2021/nov/test2/.nuxt/dist/server/server.mjs:19439:3)
(node:22218) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 3)
(node:22218) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
