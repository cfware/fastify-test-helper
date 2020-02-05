import {builderFirefox, page, setup} from '@cfware/ava-selenium-manager';
import {FastifyTestHelper} from '../index.cjs';
import {testImplementation} from './_test-implementation.js';

page('index.html', testImplementation);

setup(new FastifyTestHelper(builderFirefox));
