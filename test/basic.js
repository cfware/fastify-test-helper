import {builderFirefox, page, setup} from '@cfware/ava-selenium-manager';
import {testImplementation} from './_test-implementation';
import {FastifyTestHelper} from '..';

page('index.html', testImplementation);

setup(new FastifyTestHelper(builderFirefox));
