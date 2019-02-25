export const testImplementation = async t => {
	const {selenium, checkText} = t.context;
	const ele = await selenium.findElement({id: 'test'});

	await checkText(ele, 'Test text');
};
