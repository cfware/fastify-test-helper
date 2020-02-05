import path from 'path';

import {builderFirefox, page, setup} from '@cfware/ava-selenium-manager';
import {FastifyTestHelper} from '../index.cjs';
import {testImplementation} from './_test-implementation.js';

page('index.html', testImplementation);
page('alias.html', testImplementation);

const testsRoot = path.resolve(__dirname, '..', 'fixtures');

setup(new FastifyTestHelper(builderFirefox, {
	cwd: testsRoot,
	nodeModulesRoot: path.resolve(__dirname, '..', 'node_modules'),
	nodeModulesPrefix: '/assets',
	testsRoot,
	customGetters: {
		'/alias.html': 'index.html'
	}
}));
