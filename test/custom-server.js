import path from 'path';

import fastifyStatic from 'fastify-static';
import {builderFirefox, page, setup} from '@cfware/ava-selenium-manager';
import {testImplementation} from './helpers/test-implementation';
import {FastifyTestHelper} from '..';

page('custom-server-fail.html', testImplementation);

const testsRoot = path.resolve(__dirname, 'fixtures');

setup(new FastifyTestHelper(builderFirefox, {
	cwd: testsRoot,
	testsRoot,
	fastifyPlugin(fastify, opts, next) {
		fastify.register(fastifyStatic, {
			root: testsRoot,
			prefix: '/',
			serve: false
		});

		if (opts.checkOpts === true) {
			fastify.get('/custom-server-fail.html', (_, reply) => reply.sendFile('custom-server-pass.html'));
		} else {
			fastify.get('/custom-server-fail.html', (_, reply) => reply.sendFile('custom-server-fail.html'));
		}

		next();
	},
	fastifyPluginOpts: {
		checkOpts: true
	}
}));
