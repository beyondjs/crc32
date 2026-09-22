/**
 * The checksum as a consumer imports it: the public export, the standard vector, and how strings are
 * turned into bytes.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { crc32 } from '@beyond-js/crc32/main';

test('the main module exposes crc32', () => {
	assert.equal(typeof crc32, 'function');
});

test('the standard check vector and the empty input', () => {
	assert.equal(crc32('123456789'), 0xcbf43926, 'the CRC-32 check value of "123456789"');
	assert.equal(crc32(Buffer.from('123456789')), 0xcbf43926);
	assert.equal(crc32(''), 0);
	assert.equal(crc32(Buffer.alloc(0)), 0);
});

test('the result is an unsigned 32-bit integer for any bytes', () => {
	const bytes = Buffer.from([0xff, 0xff, 0xff, 0xff, 0x80, 0x00, 0x7f]);
	const value = crc32(bytes);
	assert.ok(Number.isInteger(value) && value >= 0 && value <= 0xffffffff);
	assert.equal(crc32(Buffer.from('a')), 0xe8b7be43);
});

test('a Buffer is read as its bytes, unchanged', () => {
	const bytes = Buffer.from([1, 2, 3]);
	const copy = Buffer.from(bytes);
	crc32(bytes);
	assert.deepEqual(bytes, copy);
	assert.equal(crc32(bytes), crc32(Buffer.from([1, 2, 3])));
	assert.notEqual(crc32(bytes), crc32(Buffer.from([3, 2, 1])));
});

test('a string is converted as Latin-1, so it differs from UTF-8 bytes beyond ASCII', () => {
	assert.equal(crc32('héllo'), crc32(Buffer.from('héllo', 'latin1')));
	assert.notEqual(crc32('héllo'), crc32(Buffer.from('héllo', 'utf8')));
	assert.equal(crc32('hello'), crc32(Buffer.from('hello', 'utf8')), 'ASCII is the same in both');
	assert.equal(crc32('€'), crc32(Buffer.from([0xac])), 'a character above U+00FF keeps its low byte only');
});

test('a value that Buffer.from does not accept is refused', () => {
	assert.throws(() => crc32(undefined), TypeError);
	assert.throws(() => crc32(123), TypeError);
	assert.throws(() => crc32({}), TypeError);
});

test('the same input always yields the same checksum, and it is not an identity', () => {
	const inputs = ['a', 'b', 'ab', 'ba', 'abc', ''];
	for (const input of inputs) assert.equal(crc32(input), crc32(input));
	assert.equal(new Set(inputs.map(crc32)).size, inputs.length, 'these particular inputs do not collide');
});
