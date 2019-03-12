# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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