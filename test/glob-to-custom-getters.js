import path from 'path';
import test from 'ava';

import {globToCustomGetters} from '..';

const cwd = path.resolve(__dirname, '..');

test('matching glob', t => {
	t.deepEqual(globToCustomGetters('{index.js,package.json}', {cwd}), {
		'/index.js': 'index.js',
		'/package.json': 'package.json'
	});
});

test('non-matching glob', t => {
	t.deepEqual(globToCustomGetters('missing.js', {cwd}), {});
});
