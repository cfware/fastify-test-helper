# @cfware/fastify-test-helper

[![Travis CI][travis-image]][travis-url]
[![Greenkeeper badge][gk-image]](https://greenkeeper.io/)
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![MIT][license-image]](LICENSE)

Testing helper for @cfware/ava-selenium-manager with fastify

### Install @cfware/fastify-test-helper

This module requires node.js 8 or above.

```sh
npm i -D @cfware/ava-selenium-manager @cfware/fastify-test-helper
```

## Usage

```js
import {builderFirefox, page, setup} from '@cfware/ava-selenium-manager';
import FastifyTestHelper from '@cfware/fastify-test-helper';

page('index.html', t => {
	// Test index.html here
});

setup(new FastifyTestHelper(builderFirefox, options));
```

See tests in [@cfware/full-center] for a real life usage example.

## new FastifyTestHelper(browserBuilder, options)

* `browserBuilder` - a selenium builder object (required).
* `options` - optional settings specific to setup of the fastify daemon.

### options.cwd

Sets the current working directory, default `process.cwd()`.

### options.nodeModules

Sets the local directory to serve under the URL `/node_modules`.
Default to `node_modules` under `options.cwd`.

### options.basetestpath

The base path which contains pages to be tested. Default `/`.

### options.fixturesRoot

Points to files which should be served under `options.basetestpath`.
Default to `test/fixtures` under `options.cwd`.

### options.customInit(daemon)

This callback can be used to register additional routes with the fastify
daemon.

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

By default:
* Ignore .babelrc and babel.config.js
* Enable [babel-plugin-istanbul] and [babel-plugin-bare-import-rewrite] plugins.

If `options.babelrc` is provided this replaces the default options.  Default
options can be retrieved from `FastifyTestHelper.DefaultBabelRC` and merged
using `Object.assign` or ES2018 object spread.

## Running tests

Tests are provided by xo and ava.

```sh
npm install
npm test
```

[npm-image]: https://img.shields.io/npm/v/@cfware/fastify-test-helper.svg
[npm-url]: https://npmjs.org/package/@cfware/fastify-test-helper
[travis-image]: https://travis-ci.org/cfware/fastify-test-helper.svg?branch=master
[travis-url]: https://travis-ci.org/cfware/fastify-test-helper
[gk-image]: https://badges.greenkeeper.io/cfware/fastify-test-helper.svg
[downloads-image]: https://img.shields.io/npm/dm/@cfware/fastify-test-helper.svg
[downloads-url]: https://npmjs.org/package/@cfware/fastify-test-helper
[license-image]: https://img.shields.io/npm/l/@cfware/fastify-test-helper.svg
[@cfware/full-center]: https://github.com/cfware/full-center
[babel-plugin-istanbul]: https://github.com/istanbuljs/babel-plugin-istanbul#readme
[babel-plugin-bare-import-rewrite]: https://github.com/cfware/babel-plugin-bare-import-rewrite#readme
