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
				'classProperties',
				'classPrivateProperties',
				'classPrivateMethods'
			]
		},
		plugins: [
			['bare-import-rewrite', {
				alwaysRootImport,
				modulesDir: nodeModulesPrefix
			}],
			['@babel/plugin-proposal-class-properties', {loose: true}],
			['@babel/plugin-proposal-private-methods', {loose: true}]
		],
		env: {
			test: {
				plugins: ['istanbul']
			}
		}
	};
}

function fastifyTestDefaultPlugin(fastify, opts, next) {
	opts.statics.forEach(staticOpts => {
		fastify.register(fastifyStatic, staticOpts);
	});

	Object.entries(opts.getters || {}).forEach(([url, file]) => {
		fastify.get(url, (_, reply) => reply.sendFile(file));
	});

	fastify.register(fastifyBabel, {
		babelrc: opts.babelrc || defaultBabelRC(opts.nodeModulesPrefix),
		maskError: false
	});

	next();
}

class FastifyTestHelper {
	constructor(browserBuilder, opts = {}) {
		this.browserBuilder = browserBuilder;
		this.testsPrefix = opts.testsPrefix || '/';
		this.fastifyPlugin = opts.fastifyPlugin || fastifyTestDefaultPlugin;
		this.fastifyPluginOpts = opts.fastifyPluginOpts;
		if (this.fastifyPlugin === fastifyTestDefaultPlugin && !this.fastifyPluginOpts) {
			const decorateReply = false;
			const cwd = opts.cwd || process.cwd();
			const nodeModulesPrefix = opts.nodeModulesPrefix || '/node_modules';

			this.fastifyPluginOpts = {
				statics: [
					{
						root: opts.sendFileRoot || cwd,
						serve: false
					},
					{
						root: opts.testsRoot || path.resolve(cwd, 'test', 'fixtures'),
						prefix: this.testsPrefix,
						decorateReply
					},
					{
						root: opts.nodeModulesRoot || path.resolve(cwd, 'node_modules'),
						prefix: nodeModulesPrefix,
						decorateReply
					},
					...(opts.extraStatics || [])
				],
				getters: opts.customGetters,
				nodeModulesPrefix,
				babelrc: opts.babelrc
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
	return glob.sync(pattern, options).reduce((acc, file) => ({
		...acc,
		[`/${file}`]: file
	}), {});
}

module.exports = {
	defaultBabelRC,
	fastifyTestDefaultPlugin,
	FastifyTestHelper,
	globToCustomGetters
};
