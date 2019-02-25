'use strict';

const path = require('path');

const fastify = require('fastify');
const fastifyStatic = require('fastify-static');
const fastifyBabel = require('fastify-babel');

class FastifyTestHelper {
	constructor(browserBuilder, opts = {}) {
		this.browserBuilder = browserBuilder;
		this.cwd = opts.cwd || process.cwd();
		this.nodeModules = opts.nodeModules || path.resolve(this.cwd, 'node_modules');
		this.basetestpath = opts.basetestpath || '/';
		this.fixturesRoot = opts.fixturesRoot || path.resolve(this.cwd, 'test', 'fixtures');
		this.customInit = opts.customInit || (() => {});
		this.customGetters = opts.customGetters || {};
		this.babelrc = opts.babelrc || FastifyTestHelper.DefaultBabelRC;
	}

	static get DefaultBabelRC() {
		return {
			babelrc: false,
			configFile: false,
			plugins: [
				'istanbul',
				'bare-import-rewrite'
			]
		};
	}

	async daemonFactory() {
		const daemon = fastify()
			.register(fastifyStatic, {
				root: this.cwd,
				serve: false
			})
			.register(fastifyStatic, {
				root: this.fixturesRoot,
				prefix: this.basetestpath,
				decorateReply: false
			})
			.register(fastifyStatic, {
				root: this.nodeModules,
				prefix: '/node_modules',
				decorateReply: false
			})
			.register(fastifyBabel, {
				babelrc: this.babelrc,
				maskError: false
			});

		this.customInit(daemon);

		Object.entries(this.customGetters).forEach(([url, file]) => {
			daemon.get(url, (_, reply) => reply.sendFile(file));
		});

		await daemon.listen(0);

		return daemon;
	}

	daemonStop(daemon) {
		daemon.server.unref();
	}

	daemonGetURL(t, daemon, pathname) {
		return `http://localhost:${daemon.server.address().port}${this.basetestpath}${pathname}`;
	}
}

module.exports = FastifyTestHelper;
