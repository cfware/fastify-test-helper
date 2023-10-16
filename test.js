#!/usr/bin/env node
import {globSync} from 'glob';
import t from 'libtap';

const files = globSync('test/**/*.js', {ignore: '**/_*.js'});
for (const file of files) {
    t.spawn(process.execPath, [file], file);
}
