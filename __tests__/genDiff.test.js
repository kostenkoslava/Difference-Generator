import { expect } from '@jest/globals';
import genDiff from '../src/index';

test('main flow', () => {
  const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  const result = genDiff('file1.json', 'file2.json');
  expect(result).toEqual(expectedResult);
});
