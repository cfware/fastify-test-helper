import t from 'libtap';
import {globToCustomGetters} from '../index.js';
import {projectDirectory as cwd} from './_helpers.js';

t.test('matching glob', async t => {
	t.same(globToCustomGetters('{index.js,package.json}', {cwd}), {
		'/index.js': 'index.js',
		'/package.json': 'package.json'
	});
});

t.test('non-matching glob', async t => {
	t.same(globToCustomGetters('missing.js', {cwd}), {});
});
