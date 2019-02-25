import path from 'path';

import {builderFirefox, page, setup} from '@cfware/ava-selenium-manager';
import {testImplementation} from './helpers/test-implementation';
import FastifyTestHelper from '..';

page('index.html', testImplementation);
page('alias.html', testImplementation);
page('alias2.html', testImplementation);

const fixturesRoot = path.resolve(__dirname, 'fixtures');

setup(new FastifyTestHelper(builderFirefox, {
	cwd: fixturesRoot,
	nodeModules: path.resolve(__dirname, '..', 'node_modules'),
	fixturesRoot,
	customInit(daemon) {
		daemon.get('/alias2.html', (_, reply) => reply.sendFile('index.html'));
	},
	customGetters: {
		'/alias.html': 'index.html'
	}
}));
