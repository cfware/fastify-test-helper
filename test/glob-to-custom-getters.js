import path from 'path';
import test from 'ava';

import {globToCustomGetters} from '../index.cjs';

const cwd = path.resolve(__dirname, '..');

test('matching glob', t => {
	t.deepEqual(globToCustomGetters('{index.cjs,package.json}', {cwd}), {
		'/index.cjs': 'index.cjs',
		'/package.json': 'package.json'
	});
});

test('non-matching glob', t => {
	t.deepEqual(globToCustomGetters('missing.js', {cwd}), {});
});
