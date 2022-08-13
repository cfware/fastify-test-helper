import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const fixtureDirectory = path.join(projectDirectory, 'fixtures');

export async function testImplementation(t, selenium) {
	const element = await selenium.findElement({id: 'test'});

	t.equal(await element.getText(), 'Test text');
}
