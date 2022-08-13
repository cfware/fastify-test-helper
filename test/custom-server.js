import t from 'libtap';
import {testBrowser} from '@cfware/tap-selenium-manager';
import fastifyStatic from '@fastify/static';
import {FastifyTestHelper} from '../index.js';
import {fixtureDirectory, testImplementation} from './_helpers.js';

const daemon = new FastifyTestHelper({
	cwd: fixtureDirectory,
	fixtureDirectory,
	fastifyPlugin(fastify, options, next) {
		fastify.register(fastifyStatic, {
			root: fixtureDirectory,
			prefix: '/',
			serve: false
		});

		if (options.checkOpts === true) {
			fastify.get('/custom-server-fail.html', (_, reply) => reply.sendFile('custom-server-pass.html'));
		} else {
			fastify.get('/custom-server-fail.html', (_, reply) => reply.sendFile('custom-server-fail.html'));
		}

		next();
	},
	fastifyPluginOpts: {
		checkOpts: true
	}
});

testBrowser(t, 'firefox', daemon, {
	'custom-server-fail.html': testImplementation
});
