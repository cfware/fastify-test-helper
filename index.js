import path from 'path';

import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import fastifyBabel from 'fastify-babel';
import glob from 'glob';

export function defaultBabelRC(nodeModulesPrefix, alwaysRootImport = ['**']) {
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
			['babel-plugin-remove-ungap'],
			['babel-plugin-bare-import-rewrite', {
				alwaysRootImport,
				modulesDir: nodeModulesPrefix
			}],
			['@babel/plugin-proposal-optional-chaining', {loose: true}],
			['babel-plugin-istanbul']
		]
	};
}

export function fastifyTestDefaultPlugin(fastify, options, next) {
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

export class FastifyTestHelper {
	_options = {
		testsPrefix: '/',
		fastifyPlugin: fastifyTestDefaultPlugin,
		cwd: process.cwd(),
		nodeModulesPrefix: '/node_modules',
		extraStatics: []
	};

	constructor(options = {}) {
		options = Object.assign(this._options, options);

		if (options.fastifyPlugin === fastifyTestDefaultPlugin && !options.fastifyPluginOpts) {
			const decorateReply = false;
			const {cwd, nodeModulesPrefix} = options;

			options.fastifyPluginOpts = {
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
					...options.extraStatics
				],
				getters: options.customGetters,
				nodeModulesPrefix,
				babelrc: options.babelrc
			};
		}
	}

	async start() {
		this._daemon = fastify()
			.register(this._options.fastifyPlugin, this._options.fastifyPluginOpts);

		await this._daemon.listen(0);
	}

	async stop() {
		this._daemon.server.unref();
	}

	get baseURL() {
		return `http://localhost:${this._daemon.server.address().port}${this._options.testsPrefix}`;
	}
}

export function globToCustomGetters(pattern, options) {
	const files = glob.sync(pattern, options);
	const result = {};
	for (const file of files) {
		result[`/${file}`] = file;
	}

	return result;
}
