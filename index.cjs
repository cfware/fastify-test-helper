'use strict';

const path = require('path');

const fastify = require('fastify');
const fastifyStatic = require('fastify-static');
const fastifyBabel = require('fastify-babel');
const glob = require('glob');

function defaultBabelRC(nodeModulesPrefix, alwaysRootImport = ['**']) {
	return {
		babelrc: false,
		configFile: false,
		parserOpts: {
			plugins: [
				'objectRestSpread',
				'importMeta',
				'classProperties'
			]
		},
		plugins: [
			'remove-ungap',
			['bare-import-rewrite', {
				alwaysRootImport,
				modulesDir: nodeModulesPrefix
			}],
			['@babel/plugin-proposal-optional-chaining', {loose: true}],
			['@babel/plugin-proposal-nullish-coalescing-operator', {loose: true}]
		],
		env: {
			test: {
				plugins: ['istanbul']
			}
		}
	};
}

function fastifyTestDefaultPlugin(fastify, options, next) {
	for (const staticOptions of options.statics) {
		fastify.register(fastifyStatic, staticOptions);
	}

	for (const [url, file] of Object.entries(options.getters || {})) {
		fastify.get(url, (_, reply) => reply.sendFile(file));
	}

	fastify.register(fastifyBabel, {
		babelrc: options.babelrc || defaultBabelRC(options.nodeModulesPrefix),
		maskError: false
	});

	next();
}

class FastifyTestHelper {
	constructor(browserBuilder, options = {}) {
		this.browserBuilder = browserBuilder;
		this.testsPrefix = options.testsPrefix || '/';
		this.fastifyPlugin = options.fastifyPlugin || fastifyTestDefaultPlugin;
		this.fastifyPluginOpts = options.fastifyPluginOpts;
		if (this.fastifyPlugin === fastifyTestDefaultPlugin && !this.fastifyPluginOpts) {
			const decorateReply = false;
			const cwd = options.cwd || process.cwd();
			const nodeModulesPrefix = options.nodeModulesPrefix || '/node_modules';

			this.fastifyPluginOpts = {
				statics: [
					{
						root: options.sendFileRoot || cwd,
						serve: false
					},
					{
						root: options.testsRoot || path.resolve(cwd, 'fixtures'),
						prefix: this.testsPrefix,
						decorateReply
					},
					{
						root: options.nodeModulesRoot || path.resolve(cwd, 'node_modules'),
						prefix: nodeModulesPrefix,
						decorateReply
					},
					...(options.extraStatics || [])
				],
				getters: options.customGetters,
				nodeModulesPrefix,
				babelrc: options.babelrc
			};
		}
	}

	async daemonFactory() {
		const daemon = fastify()
			.register(this.fastifyPlugin, this.fastifyPluginOpts);

		await daemon.listen(0);

		return daemon;
	}

	daemonStop(daemon) {
		daemon.server.unref();
	}

	daemonGetURL(daemon, pathname) {
		return `http://localhost:${daemon.server.address().port}${this.testsPrefix}${pathname}`;
	}
}

function globToCustomGetters(pattern, options) {
	const files = glob.sync(pattern, options);
	const result = {};
	for (const file of files) {
		result[`/${file}`] = file;
	}

	return result;
}

module.exports = {
	defaultBabelRC,
	fastifyTestDefaultPlugin,
	FastifyTestHelper,
	globToCustomGetters
};
