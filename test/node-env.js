import test from 'ava';

test('process.env.NODE_ENV === \'test\'', t => {
	t.is(process.env.NODE_ENV, 'test');
});
