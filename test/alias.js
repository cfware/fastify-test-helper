import path from 'node:path';

import t from 'libtap';
import {testBrowser} from '@cfware/tap-selenium-manager';
import {FastifyTestHelper} from '../index.js';
import {fixtureDirectory, projectDirectory, testImplementation} from './_helpers.js';

const daemon = new FastifyTestHelper({
	cwd: fixtureDirectory,
	nodeModulesRoot: path.join(projectDirectory, 'node_modules'),
	nodeModulesPrefix: '/assets',
	testsRoot: fixtureDirectory,
	customGetters: {
		'/alias.html': 'index.html'
	}
});

testBrowser(t, 'firefox', daemon, {
	'index.html': testImplementation,
	'alias.html': testImplementation
});
