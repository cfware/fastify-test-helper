# @cfware/fastify-test-helper [![NPM Version][npm-image]][npm-url]

Testing helper for @cfware/tap-selenium-manager with fastify

## Usage

```js
import t from 'libtap';
import {testBrowser} from '@cfware/tap-selenium-manager';
import {FastifyTestHelper} from '@cfware/fastify-test-helper';

testBrowser(t, 'firefox', new FastifyTestHelper(), {
  async 'index.html'(t, selenium) {
    // Test index.html here
  }
});
```

See tests in [@cfware/history-state] for a real life usage example.

## new FastifyTestHelper(options)

* `options` - optional settings specific to setup of the fastify daemon.

### options.cwd

Sets the current working directory, default `process.cwd()`.

### options.nodeModulesPrefix

The base path to serve node_modules. Default `/node_modules`.

### options.nodeModulesRoot

Sets the local directory to serve under `options.nodeModulesPrefix`.
Default to `node_modules` under `options.cwd`.

### options.testsPrefix

The base path which contains pages to be tested. Default `/`.

### options.testsRoot

Points to files which should be served under `options.testsPrefix`.
Default to `fixtures` under `options.cwd`.

### options.customGetters

This object is used to register custom GET URL's to a local path.

Example:
```js
{
  customGetters: {
    '/url.js': 'index.js'
  }
}
```

This will cause requests to the URL `/url.js` to serve `index.js`.  The
path of `index.js` is relative to `process.cwd()`, no attempt is made to
prevent serving parent directories.

### options.babelrc

Ignores any `.babelrc` and `babel.config.js` settings by default.

The following plugins are enabled by default:
* [babel-plugin-remove-ungap]
* [babel-plugin-bare-import-rewrite]
* [babel-plugin-istanbul]
* [@babel/plugin-proposal-optional-chaining] (loose mode)

The following [parser plugins] are enabled by default:
* objectRestSpread
* importMeta
* classProperties

If `options.babelrc` is provided it replaces the default settings.  Default
options can be retrieved from the `defaultBabelRC` named export and merged
using `Object.assign` or ES2018 object spread.


[npm-image]: https://img.shields.io/npm/v/@cfware/fastify-test-helper.svg
[npm-url]: https://npmjs.org/package/@cfware/fastify-test-helper
[@cfware/history-state]: https://github.com/cfware/history-state
[babel-plugin-remove-ungap]: https://github.com/cfware/babel-plugin-remove-ungap#readme
[babel-plugin-istanbul]: https://github.com/istanbuljs/babel-plugin-istanbul#readme
[babel-plugin-bare-import-rewrite]: https://github.com/cfware/babel-plugin-bare-import-rewrite#readme
[@babel/plugin-proposal-optional-chaining]: https://www.npmjs.com/package/@babel/plugin-proposal-optional-chaining
[parser plugins]: https://babeljs.io/docs/en/babel-parser#plugins
