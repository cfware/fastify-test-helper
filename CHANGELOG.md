# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.6.0](https://github.com/cfware/fastify-test-helper/compare/v0.5.0...v0.6.0) (2020-02-07)


### ⚠ BREAKING CHANGES

* This is a total rewrite.

### Features

* Rewrite to support ESM consumers ([1c4e5d0](https://github.com/cfware/fastify-test-helper/commit/1c4e5d0d00c30d7e97e8a1dac8cf5895bd609a4f))

## [0.5.0](https://github.com/cfware/fastify-test-helper/compare/v0.4.0...v0.5.0) (2020-02-06)


### ⚠ BREAKING CHANGES

* Remove class property transformations
* Remove private property / method parser plugins

### Features

* Add optional chaining and nullish coalescing plugins ([755607b](https://github.com/cfware/fastify-test-helper/commit/755607bf893dd751113c1d741cd3ea733b87b913))

## [0.4.0](https://github.com/cfware/fastify-test-helper/compare/v0.3.0...v0.4.0) (2019-12-31)


### ⚠ BREAKING CHANGES

* node.js 12 is now required

### Features

* Update dependencies ([2023a59](https://github.com/cfware/fastify-test-helper/commit/2023a59dac0d0286e612b91374ff3cd74b51d7fd))

## [0.3.0](https://github.com/cfware/fastify-test-helper/compare/v0.2.3...v0.3.0) (2019-06-03)


### Features

* Update for ava 2.0.0 ([64e0b35](https://github.com/cfware/fastify-test-helper/commit/64e0b35))


### BREAKING CHANGES

* The default testsRoot is now `fixtures` instead of
`test/fixtures`.



## [0.2.3](https://github.com/cfware/fastify-test-helper/compare/v0.2.2...v0.2.3) (2019-04-25)



## [0.2.2](https://github.com/cfware/fastify-test-helper/compare/v0.2.1...v0.2.2) (2019-03-22)


### Features

* Add babel-plugin-remove-ungap. ([b8ae6d3](https://github.com/cfware/fastify-test-helper/commit/b8ae6d3))
* Add support for class properties and private methods. ([b1615ac](https://github.com/cfware/fastify-test-helper/commit/b1615ac))



## [0.2.1](https://github.com/cfware/fastify-test-helper/compare/v0.2.0...v0.2.1) (2019-03-18)


### Bug Fixes

* Only enable istanbul when process.env.NODE_ENV === 'test' ([9d95253](https://github.com/cfware/fastify-test-helper/commit/9d95253))


### Features

* Implement globToCustomGetters ([c826c3b](https://github.com/cfware/fastify-test-helper/commit/c826c3b))



# [0.2.0](https://github.com/cfware/fastify-test-helper/compare/v0.1.0...v0.2.0) (2019-02-28)


### Features

* Update for @cfware/ava-selenium-manager@0.2.0. ([4cbdf2c](https://github.com/cfware/fastify-test-helper/commit/4cbdf2c))


### BREAKING CHANGES

* Replace default export with `FastifyTestHelper` named
export.
* Resolve bare import specifiers from root node_modules
by default.
* Remove static property `DefaultBabelRC`.
* Move `browserBuilder` argument into options object.
* Rename `basetestpath` option to `testsPrefix`.
* Rename `fixturesRoot` option to `testsRoot`.
* Rename `nodeModules` option to `nodeModulesRoot`.
* Remove `customInit` option.
