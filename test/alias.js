import path from 'path';

import {builderFirefox, page, setup} from '@cfware/ava-selenium-manager';
import {testImplementation} from './helpers/test-implementation';
import {FastifyTestHelper} from '..';

page('index.html', testImplementation);
page('alias.html', testImplementation);

const testsRoot = path.resolve(__dirname, 'fixtures');

setup(new FastifyTestHelper(builderFirefox, {
	cwd: testsRoot,
	nodeModulesRoot: path.resolve(__dirname, '..', 'node_modules'),
	nodeModulesPrefix: '/assets',
	testsRoot,
	customGetters: {
		'/alias.html': 'index.html'
	}
}));
