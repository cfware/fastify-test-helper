#!/usr/bin/env node
import glob from 'glob';
import t from 'libtap';

const files = glob.sync('test/**/*.js', {ignore: '**/_*.js'});
for (const file of files) {
	t.spawn(process.execPath, [file], file);
}
