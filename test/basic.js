import path from 'node:path';

import t from 'libtap';
import {testBrowser} from '@cfware/tap-selenium-manager';
import {FastifyTestHelper} from '../index.js';
import {projectDirectory, testImplementation} from './_helpers.js';

process.env.NYC_CONFIG = JSON.stringify({
	cwd: projectDirectory,
	include: 'fixtures/**'
});
global.__coverage__ = {};

async function main() {
	await testBrowser(t, 'firefox', new FastifyTestHelper(), {
		'index.html': testImplementation
	});

	await t.test('after firefox', async t => {
		t.equal(Object.keys(global.__coverage__).length, 1);
		t.match(global.__coverage__, {[path.join(projectDirectory, 'fixtures', 'index.js')]: Object});
		delete global.__coverage__;
	});
}

main().catch(t.error);
